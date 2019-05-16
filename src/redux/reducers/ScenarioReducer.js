import {scenarioAction} from '../actions/ScenarioAction'
import ConfigWrapper from "../../controller/ConfigWrapper";

const {scenario} = ConfigWrapper.get();


const INITIAL_STATE = {
	current: scenario.mainMenu
};


export const scenarioReducer = (state = INITIAL_STATE, action) => {
	
	switch (action.type) {
		case scenarioAction.changeCurrentScenario.type:
			
			
			state = {
				...state,
				current: action.scenario
			};
			break;
		default:
			break;
		
	}
	
	return state;
};