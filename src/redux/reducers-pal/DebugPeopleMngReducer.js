
import {DebugPeopleAction} from "../actions/DebugPeopleMngAction";
import { act } from "react-dom/test-utils";

const INITIAL_STATE = {
	debugView: {
        listPeopleMng: []
	}
};


export const debugPeopleMngReducer = (state = INITIAL_STATE, action) => {

    if (action.type == DebugPeopleAction.listPeopleMng.type) {
        console.log("test reducer get people list")
        console.log(action)
        let people_list = action.state
        state = {
            
            ...state,
            
            debugView: {
                listPeopleMng: people_list
            }
        };
    };
    return state;
};