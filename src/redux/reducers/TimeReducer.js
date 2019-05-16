import {timeAction} from "../actions/TimeAction";
import debug from '../../config/log';
import Logger from "../../dev/Logger";
import Timer from "../../model/Timer";
import ConfigWrapper from "../../controller/ConfigWrapper";


const logger = new Logger(debug.reducer.time, "TimeReducer");
const {ALMemoryEvent} = ConfigWrapper.get();


const init = (state, steps) => {
	
	
	state = {...state};
	
	const getDataFromJson = (jsonValue) => {
		
		return {
			name: jsonValue.name,
			eta: jsonValue.eta,
			order: jsonValue.order
			
		}
	};
	
	Object.keys(steps).forEach(key => {
		state.todoSteps.push(getDataFromJson(steps[key]));
	});
	
	// state.currentStep = getDataFromJson(steps[keys[0]]);
	//
	// for (let i = 1; i < keys.length; i++) {
	// 	state.todoSteps.push(getDataFromJson(steps[keys[i]]));
	//
	// }
	
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
	// if (null == obj || "object" != typeof obj) return obj;
	// const copy = obj.constructor();
	// for (const attr in obj) {
	// 	if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	// }
	return JSON.parse(JSON.stringify(obj));
}

function getDefaultState() {
	return clone(DEFAULT_STATE);
}




const INITIAL_STATE = init(getDefaultState(), []   );




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
			
			case timeAction.changeCurrentStep.type:
				
				
				if (!undefinedActionStep(action)) {
					stepIndex = clonedState.todoSteps.findIndex(step => step.name === action.step.name);
					
					clonedState.stepElapsedTime = 0;
					
					todoStep = [...state.todoSteps];
					todoStep.splice(stepIndex, 1);
					
					if (clonedState.currentStep !== null) {
						todoStep.push(clonedState.currentStep);
					}
					
					clonedState = {
						...clonedState,
						currentStep: {
							...clonedState.currentStep,
							...action.step
						},
						todoSteps: todoStep
					};
				} else {
					logger.warn(timeAction.changeCurrentStep.type, "Care try to changeCurrentStep with an undefined step");
					
				}
				
				
				break;
			
			case timeAction.setStepCompleted.type:
				
				if (clonedState.currentStep !== null) {
					const doneStep = [...state.doneSteps];
					doneStep.push(clonedState.currentStep);
					
					clonedState = {
						...clonedState,
						doneSteps: doneStep,
						currentStep: null
					};
					
				} else {
					logger.warn(timeAction.setStepCompleted.type, "Try to set complete an undefined step");
					
				}
				
				break;
			
			case timeAction.setStepSkipped.type:
				
				if (!undefinedActionStep(action)) {
					const skippedStep = [...clonedState.skippedSteps];
					todoStep = [...state.todoSteps];
					
					// Check if the new skippedStep is not already in the skippedStep
					if (skippedStep.indexOf(action.step) === -1)
					{
						skippedStep.push(action.step);
					} else {
						logger.warn(`Cant have multiple times ${action.step.name} in skippedStep []`)
					}
					
					// Check if the currentStep is the one that have to be skipped
					let currentStep = clonedState.currentStep;
					if (currentStep && currentStep.order === action.step.order) {
						currentStep = null;
					}
					
					
					// Search if the new Skipped step was in todoSteps and remove it
					const indexInTodoStep = state.todoSteps.findIndex(step => step.order === action.step.order);
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
			
			case timeAction.toggleTimer.type:
				
				const {start, stop} = ALMemoryEvent.toggleTimer.mode;
				
				if ([start, stop].includes(action.mode)) {
					switch (action.mode) {
						case start:
							Timer.startTimer();
							break;
						
						case stop:
							Timer.stopTimer();
							break;
						
						
						default:
							break
					}
				} else {
					logger.warn("ToggleTimer", "Unknown mode for toggleTimer")
				}
				
				break;
		
			case timeAction.replaceAllSteps.type:
				
				logger.debug("You are un replaceAllSteps reducer", action);
				if(action.steps.length !== undefined) {
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

