import {scenarioAction} from '../actions/ScenarioAction'


const INITIAL_STATE = {
	current: {}
	// todo scenario
};


export const scenarioReducer = (state = INITIAL_STATE, action) => {
	
	if (action.type === scenarioAction.currentScenario.type) {
		
		state = {
			
			...state,
			
			current: {
				...action.scenario,
			}
		};
		
	}
	
	return state;
};