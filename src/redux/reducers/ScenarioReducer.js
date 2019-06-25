import {scenarioAction} from '../actions/ScenarioAction'


const INITIAL_STATE = {
	current: {
		name : "None"
	}
};


export const scenarioReducer = (state = INITIAL_STATE, action) => {
	
	if (action.type === scenarioAction.currentScenario.type) {
		
		state = {
			
			...state,
			
			current: {
				name : action.scenarioName
			}
		};
		
	}
	
	return state;
};