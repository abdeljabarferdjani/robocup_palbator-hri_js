
import {hideSoundIconAction} from "../actions/AppVisualAction";

const INITIAL_STATE = {
	appView: {
		hideSoundIcon: false
	}
};


export const appVisualReducer = (state = INITIAL_STATE, action) => {
		if (action.type === hideSoundIconAction.hideSoundIcon.type) {
			console.log(action.hide)
			
			let hideIcon = action.hide
			state = {
				
				...state,
				
				appView: {
					hideSoundIcon: hideIcon
				}
			};

		}

	return state;
};