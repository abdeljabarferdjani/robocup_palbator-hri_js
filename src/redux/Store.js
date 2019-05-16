import {applyMiddleware, combineReducers, createStore} from 'redux';
import {createLogger} from 'redux-logger'
import {viewReducer} from "./reducers/ViewReducer";
import {comReducer} from "./reducers/CommunicationReducer";
import {toolbarReducer} from "./reducers/ToolbarReducer";
import {timeReducer} from "./reducers/TimeReducer";
import {scenarioReducer} from './reducers/ScenarioReducer'
import logConfig from '../config/log'
import {composeWithDevTools} from "redux-devtools-extension";

let dispatch = null;

let localStore;

const getStore = () => {
	if(localStore === undefined) {
		let store;
		if (logConfig.redux) {
			const logger = createLogger({
				level: "info",
				diff: false,
				duration: true
			});
			
			store = createStore(
				combineReducers({
					view: viewReducer,
					toolbar: toolbarReducer,
					com: comReducer,
					time: timeReducer,
					scenario: scenarioReducer
				}),
				{},
				composeWithDevTools(applyMiddleware(logger))
			);
		} else {
			store = createStore(
				combineReducers({
					view: viewReducer,
					toolbar: toolbarReducer,
					com: comReducer,
					time: timeReducer,
					scenario: scenarioReducer
					
				}),
				{},
				composeWithDevTools()
			);
		}
		
		
		dispatch = store.dispatch;
		localStore = store;
	}
	
	return localStore;
	
};

export default getStore;
export {
	dispatch,
	localStore as store
}
