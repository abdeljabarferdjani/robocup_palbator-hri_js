import {scenarioAction} from '../actions/ScenarioAction'
import ConfigWrapper from "../../controller/ConfigWrapper";

const {scenario} = ConfigWrapper.get();


const INITIAL_STATE = {
	current: scenario["mainMenu"]
};


export const scenarioReducer = (state = INITIAL_STATE, action) => {
	
	if (action.type === scenarioAction.changeCurrentScenario.type) {
		state = {
			...state,
			current: action.scenario
		};
	} else {
	}
	
	return state;
};