
import {hideSoundIconAction} from "../actions/AppVisualAction";

const INITIAL_STATE = {
	appView: {
		hideSoundIcon: true
	}
};


export const appVisualReducer = (state = INITIAL_STATE, action) => {
		if (action.type === hideSoundIconAction.hideSoundIcon.type) {
			console.log("test reducer")
			console.log(action)
			// console.log(action.hide)
			
			let hideIcon = action.state
			// let hideIcon = action.hide
			state = {
				
				...state,
				
				appView: {
					hideSoundIcon: hideIcon
				}
			};

		}

	return state;
};