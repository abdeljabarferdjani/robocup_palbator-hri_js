import {timeAction} from "../actions/TimeAction";
import debug from '../../config/log';
import Logger from "../../dev/Logger";
import Timer from "../../model/Timer";
import ConfigWrapper from "../../controller/ConfigWrapper";
import {getStepById} from "../../controller/ALMemoryBridge";


const logger = new Logger(debug.reducer.time, "TimeReducer");
const {apis: {generalManagerHRI}} = ConfigWrapper.get();

const init = (state, steps) => {
	
	
	state = {...state};
	
	
	const getDataFromJson = (jsonValue) => {
		
		return {
			name: jsonValue.name,
			eta: jsonValue.eta,
			order: jsonValue.order,
			id: jsonValue.id,
			action: jsonValue.action
			
		}
	};
	
	Object.keys(steps).forEach(key => {
		state.todoSteps.push(getDataFromJson(steps[key]));
	});
	
	console.warn("State after init", state)
	
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

const possibleActionType = [];
Object.keys(timeAction).forEach(key => {
	possibleActionType.push(timeAction[key].type)
});


const timeReducer = (state = INITIAL_STATE, action) => {
	
	let clonedState = {...state}, stepIndex, todoStep;
	
	// Dont allow other reducer's action to interact with this reducer
	
	if (possibleActionType.includes(action.type)) {

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
					console.log("HEY 1");
					
					stepIndex = clonedState.todoSteps.findIndex(step => step.id === action.stepId);
					
					console.log("HEY 2", stepIndex);
					
					clonedState.stepElapsedTime = 0;
					
					todoStep = [...state.todoSteps];
					const step = todoStep.splice(stepIndex, 1)[0];
					
					console.log("HEY 2.5", step);
					if (clonedState.currentStep !== null) {
						console.log("HEY 3");
						todoStep.push(clonedState.currentStep);
					}
					
					clonedState = {
						...clonedState,
						currentStep: {
							...step
						},
						todoSteps: todoStep
					};
					
					console.warn("HEY 4", clonedState)
					
					
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
					
					let steps = [];
					console.warn(1, clonedState, steps);
					
					action.steps.forEach(step => {
						// Add only title steps (in blue in excel)
						if (step.action === "") {
							steps.push(step);
							console.log("DOAZ?D?ZAOXAZ", step);
						}
						
						
					});
					
					steps = steps.sort((step1, step2) => {
						return step1['order'] < step2['order'] ? -1 : 1
					});
					
					
					logger.debug("replace B", clonedState);
					clonedState = init(getDefaultState(), steps);
					logger.debug("replace A", clonedState);
					console.warn(2, clonedState, steps)
					
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

