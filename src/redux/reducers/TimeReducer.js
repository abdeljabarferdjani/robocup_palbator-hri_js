import {timeAction} from "../actions/TimeAction";
import debug from '../../config/log';
import Logger from "../../dev/Logger";
import Timer from "../../model/Timer";
import ConfigWrapper from "../../controller/ConfigWrapper";


const logger = new Logger(debug.reducer.time, "TimeReducer");
const {apis: {generalManagerHRI}} = ConfigWrapper.get();

const init = (state, steps) => {
	
	
	state = {...state};
	
	
	const getDataFromJson = (jsonValue) => {
		
		return {
			name: jsonValue.name,
			eta: jsonValue.eta,
			id: jsonValue.id
		}
	};
	let order = 0;
	Object.keys(steps).forEach(key => {
		state.todoSteps.push({
			...getDataFromJson(steps[key]),
			order: order++
		});
	});
	
	state.allSteps = [...state.todoSteps];
	
	console.warn("State after init", state);
	
	return state
};


const DEFAULT_STATE = {
	// todo get only one list of steps with status incorporated
	currentStep: null,
	todoSteps: [],
	doneSteps: [],
	skippedSteps: [],
	allSteps: [],
	globalElapsedTime: 0,
	stepElapsedTime: 0,
	haveToReset: false
	
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
	
	let clonedState = {...state}, stepIndex, todoSteps;
	
	// Dont allow other reducer's action to interact with this reducer
	
	if (possibleActionType.includes(action.type)) {
		let doneSteps;
		let todoSteps;
		let currentStep;
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
			
			case timeAction.resetStepsProgression.type:
				clonedState.haveToReset = action.state;
				break;
				
			case timeAction.currentStep.type:
				
				
				if (action.index !== undefined) {
					console.log("HEY 1");
					
					const researchedStep = state.allSteps[action.index];
					
					stepIndex = clonedState.todoSteps.findIndex(step => step.id === researchedStep.id);
					
					console.log("HEY 2", stepIndex);
					
					clonedState.stepElapsedTime = 0;
					
					todoSteps = [...state.todoSteps];
					const step = todoSteps.splice(stepIndex, 1)[0];
					
					// console.log("HEY 2.5", step);
					// if (clonedState.currentStep !== null) {
					// 	console.log("HEY 3");
					// 	todoSteps.push(clonedState.currentStep);
					// }
					
					clonedState = {
						...clonedState,
						currentStep: {
							...step
						},
						todoSteps: todoSteps
					};
					
					console.warn("HEY 4", clonedState)
					
					
				} else {
					logger.warn(timeAction.currentStep.type, "Care try to currentStep with an undefined step");
					
				}
				
				
				break;
			
			case timeAction.stepCompleted.type:
				
				doneSteps = [...clonedState.doneSteps];
				todoSteps = [...clonedState.todoSteps];
				currentStep = clonedState.currentStep;
				
				action.indexes.forEach(index => {
					const researchedStep = clonedState.allSteps[index];
					if (clonedState.currentStep.id === researchedStep.id) {
						currentStep = null;
					}
					
					const indexInTodo = todoSteps.findIndex(step => step.id === researchedStep.id);
					if (indexInTodo > -1) {
						todoSteps.splice(indexInTodo, 1);
					}
					doneSteps.push(researchedStep);
				});
				
				clonedState = {
					...clonedState,
					currentStep: currentStep,
					todoSteps: todoSteps,
					doneSteps: doneSteps,
				};
				
				break;
			
			case timeAction.stepSkipped.type:
				// action.index
				doneSteps = [...clonedState.doneSteps];
				currentStep = clonedState.currentStep;
				action.indexes.forEach(index => {
					const researchedStep = clonedState.allSteps[index];
					if (clonedState.currentStep.id === researchedStep.id) {
						currentStep = null;
					}
					doneSteps.push(clonedState.allSteps[index]);
				});
				
				clonedState = {
					...clonedState,
					currentStep: currentStep,
					doneSteps: doneSteps,
				};
				
				
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
					
					// let steps = [];
					// console.warn(1, clonedState, steps);
					//
					// action.steps.forEach(step => {
					// 	// Add only title steps (in blue in excel)
					// 	if (step.action === "") {
					// 		steps.push(step);
					// 		console.log("DOAZ?D?ZAOXAZ", step);
					// 	}
					//
					//
					// });
					//
					// steps = steps.sort((step1, step2) => {
					// 	return step1['order'] < step2['order'] ? -1 : 1
					// });
					
					
					logger.debug("replace B", clonedState);
					clonedState = init(getDefaultState(), action.steps);
					logger.debug("replace A", clonedState);
					console.warn(2, clonedState, action.steps)
					
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

