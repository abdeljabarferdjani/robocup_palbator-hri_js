import {comAction} from "../actions/CommunicationAction";
import Logger from "../../dev/Logger";
import logConfig from '../../config/log'
import QiWrapper from "../../model/QiWrapper";
import ConfigQiWrapper from "../../controller/ConfigWrapper";
import SocketWrapper from '../../model/SocketWrapper';

const {apis: {generalManagerHRI, common, tabletLM},} = ConfigQiWrapper.get();

const INITIAL_STATE = {
	lastLocalManagerHeartbeat: null,
	lastGeneralManagerHeartbeat: null,
	delayWithPepper: 0
};
const logger = new Logger(logConfig.reducer.com, "ComReducer");


const possibleActionType = [];
Object.keys(comAction).forEach(key => possibleActionType.push(comAction[key].type));

/**
 * @description Reducer for communication between the locale Manager (py) and JS
 */
const comReducer = (state = INITIAL_STATE, action) => {
		
	const socket = new SocketWrapper();

		if (possibleActionType.includes(action.type)) {
			
			switch (action.type) {
				
				case comAction.stepReceived.type:
					
					QiWrapper.raise(generalManagerHRI.stepReceived.ALMemory, null);
					break;
				
				
				case comAction.jsHeartbeat.type:
					
					QiWrapper.raise(common.jsHeartbeat.ALMemory, Date.now());
					break;
				
				case comAction.dataJs.type:
					// const {ALMemory} = tabletLM.dataJs;
					
					
					// QiWrapper.raise(ALMemory, {
					// 	dataType: action.dataType,
					// 	data: action.data,
					// 	actionId: action.actionId
					// });
					
					console.log(action)
					socket._type.emit('dataReceived',{
						dataType: action.dataType,
						data: action.data,
						actionId: action.actionId
					});
					
					break;
				
				case comAction.extHeartbeat.type:
					
					
					if (state.lastLocalManagerHeartbeat === null && action.time.lm !== undefined) {
						state.delayWithPepper = Math.floor(Date.now() / 1000) - action.time.lm;
						
					}
					
					
					state = {
						...state,
						lastGeneralManagerHeartbeat: action.time.gm,
						lastLocalManagerHeartbeat: action.time.lm
					};
					
					const currentTime = Date.now() / 1000;
					
					let diffLM = (currentTime - state.lastLocalManagerHeartbeat - state.delayWithPepper);
					const LMStr = "No heartbeats from LocalManager since " + diffLM;
					if (diffLM > 10) {
						logger.error(LMStr)
						
					} else if (diffLM > 5) {
						logger.warn(LMStr)
					}
					
					
					let diffGM = (currentTime - state.lastGeneralManagerHeartbeat);
					const GMStr = "No heartbeats from LocalManager since " + diffGM;
					if (diffGM > 10) {
						logger.error(GMStr)
						
					} else if (diffGM > 5) {
						logger.warn(GMStr)
					}
					
					logger.debug(currentTime);
					
					break;
				
				case comAction.askToChangeScenario.type:
    			socket._type.emit('askToChangeScenarioGM',{
							scenario: action.scenario
					});
					break;

				case comAction.askToResetHRI.type:
    			socket._type.emit('askToResetHRIGM')
					break;
				
				
				default:
					// console.warn("Unknown action on commmunication reducer", action);
					break;
				
			}
			
			
		}
		
		return state;
		
	}
;

export {
	comReducer
}
