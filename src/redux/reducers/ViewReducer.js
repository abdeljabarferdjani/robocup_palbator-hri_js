import {viewAction} from "../actions/ViewAction";
import Logger from "../../dev/Logger";
import logConfig from '../../config/log'

const INITIAL_STATE = {
	currentView: null,
	componentVisibility: {
		timeBoard: viewAction.setComponentVisibility.state.visible
	}
	
};

const logger = new Logger(logConfig.reducer.view, "ViewReducer");

const viewReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	
	
		case viewAction.type:
			state = {
				...state,
				currentView: action.view
			};
			break;
		
		case viewAction.setComponentVisibility.type :
			
			const {timeBoard,} = viewAction.setComponentVisibility.component;
			if ([timeBoard].includes(action.component)) {
				
				const {hidden, visible} = viewAction.setComponentVisibility.state;
				if ([hidden, visible].includes(action.state)) {
					
					switch (action.component) {
						case timeBoard:
							state = {
								...state,
								componentVisibility: {
									...state.componentVisibility,
									timeBoard: action.state
								}
							};
							break;
						default:
							break;
					}
					
				} else {
					logger.warn("setComponentVisibility", "unknown component visibility state");
				}
				
			} else {
				logger.warn("setComponentVisibility", "unknown component");
			}
			
			break;
		
		default:
			break;
		
		
	}
	
	return state;
};

export {
	viewReducer
}