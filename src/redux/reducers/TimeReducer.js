import {timeAction} from "../actions/TimeAction";
import debug from '../../config/log';
import Logger from "../../dev/Logger";
import Timer from "../../model/Timer";
import ConfigWrapper from "../../controller/ConfigWrapper";
import ALMemoryBridge, {
	getScenarioSteps,
	getStepById
} from "../../controller/ALMemoryBridge";


const logger = new Logger(debug.reducer.time, "TimeReducer");
const {apis: {generalManagerHRI}} = ConfigWrapper.get();

const init = (state, steps) => {
	
	
	state = {...state};
	
	
	const getDataFromJson = (jsonValue) => {
		
		return {
			name: jsonValue.name,
			eta: jsonValue.eta,
			order: jsonValue.order,
			id: jsonValue.id
			
		}
	};
	
	Object.keys(steps).forEach(key => {
		state.todoSteps.push(getDataFromJson(steps[key]));
	});
	
	console.log("State,", state, DEFAULT_STATE);
	
	return state
};


const DEFAULT_STATE = {
	currentStep: null,
	todoSteps: [],
	doneSteps: [],
	skippedSteps: [],
	globalElapsedTime: 0,
	stepElapsedTime: 0
	
};

function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function getDefaultState() {
	return clone(DEFAULT_STATE);
}


const INITIAL_STATE = init(getDefaultState(), []);


function undefinedActionStep(action) {
	return (action.step === undefined)
}


const possibleActionType = [];
Object.keys(timeAction).forEach(key => {
	possibleActionType.push(timeAction[key].type)
});


console.log("Possible actions : ", possibleActionType);

const timeReducer = (state = INITIAL_STATE, action) => {
	
	let clonedState = {...state}, stepIndex, todoStep;
	
	// Dont allow other reducer's action to interact with this reducer
	
	if (possibleActionType.includes(action.type)) {
		console.log("Action : ", action);
		
		switch (action.type) {
			
			
			
			case timeAction.passSecond.type:
				
				if (action.globalElapsedTime !== undefined && action.timeFromLastEvent !== undefined) {
					logger.log(timeAction.passSecond.type, action.globalElapsedTime);
					
					clonedState = {
						...clonedState,
						globalElapsedTime: action.globalElapsedTime,
						stepElapsedTime: clonedState.stepElapsedTime + action.timeFromLastEvent
					};
					
					
				} else {
					logger.warn(timeAction.passSecond.type, "Care no action.globalElapsedTime");
				}
				
				
				break;
			
			case timeAction.currentStep.type:
				
				
				if (action.stepId !== undefined) {
					
					console.log("ChangeCurrentStep", action);
					
					stepIndex = clonedState.todoSteps.findIndex(step => step.id === action.stepId);
					
					clonedState.stepElapsedTime = 0;
					
					todoStep = [...state.todoSteps];
					const step = todoStep.splice(stepIndex, 1)[0];
					
					if (clonedState.currentStep !== null) {
						todoStep.push(clonedState.currentStep);
					}
					
					clonedState = {
						...clonedState,
						currentStep: {
							...clonedState.currentStep,
							...step
						},
						todoSteps: todoStep
					};
				} else {
					logger.warn(timeAction.currentStep.type, "Care try to currentStep with an undefined step");
					
				}
				
				
				break;
			
			case timeAction.stepCompleted.type:
				
				if (clonedState.currentStep !== null) {
					const doneStep = [...state.doneSteps];
					doneStep.push(clonedState.currentStep);
					
					clonedState = {
						...clonedState,
						doneSteps: doneStep,
						currentStep: null
					};
					
				} else {
					logger.warn(timeAction.stepCompleted.type, "Try to set complete an undefined step");
					
				}
				
				break;
			
			case timeAction.stepSkipped.type:
				
				if (action.stepId !== undefined) {
					const skippedStep = [...clonedState.skippedSteps];
					todoStep = [...state.todoSteps];
					const step = getStepById(action.stepId);
					
					
					// Check if the new skippedStep is not already in the skippedStep
					if (skippedStep.indexOf(step => step.id === action.stepId) === -1)
					{
						skippedStep.push(step);
					} else {
						logger.warn(`Cant have multiple times ${action.step.name} in skippedStep []`)
					}
					
					// Check if the currentStep is the one that have to be skipped
					let currentStep = clonedState.currentStep;
					if (currentStep && currentStep.id === action.step.id) {
						currentStep = null;
					}
					
					
					// Search if the new Skipped step was in todoSteps and remove it
					const indexInTodoStep = state.todoSteps.findIndex(step => step.id === action.step.id);
					if (indexInTodoStep >= 0) {
						todoStep.splice(indexInTodoStep, 1);
					}
					
					// Recreate clonedState using new steps
					clonedState = {
						...clonedState,
						todoSteps: todoStep,
						skippedSteps: skippedStep,
						currentStep: currentStep
					};
					
				} else {
					logger.warn("Cant skip un undefined action or there is no action to skip");
				}
				
				
				break;
			
			case timeAction.timerState.type:
				
				const {on, off} = generalManagerHRI.timerState.state;
				
				if ([on, off].includes(action.state)) {
					switch (action.state) {
						case on:
							Timer.startTimer();
							break;
						
						case off:
							Timer.stopTimer();
							break;
						
						
						default:
							break
					}
				} else {
					logger.warn("ToggleTimer", "Unknown ALMstate for timerState")
				}
				
				break;
			
			case timeAction.replaceAllSteps.type:
				
				logger.debug("You are un replaceAllSteps reducer", action);
				if (action.steps.length !== undefined) {
					logger.debug("B", clonedState);
					clonedState = init(getDefaultState(), action.steps);
					logger.debug("A", clonedState);
				}
				
				break;
			
			
			default:
				break;
		}
		
	}
	
	
	return clonedState;
};

export {
	timeReducer
}

