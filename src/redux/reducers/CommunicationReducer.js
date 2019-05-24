import {comAction} from "../actions/CommunicationAction";
import QiWrapper from "../../model/QiWrapper";
import Logger from "../../dev/Logger";
import logConfig from '../../config/log'
import ConfigWrapper from "../../controller/ConfigWrapper";


const {apis: {generalManagerHRI, common, tabletLM},} = ConfigWrapper.get();

const INITIAL_STATE = {};
const logger = new Logger(logConfig.reducer.com, "ComReducer");
/**
 * @description Reducer for communication between the locale Manager (py) and JS
 * @param state
 * @param action
 */

const possibleActionType = [];
Object.keys(comAction).forEach(key => possibleActionType.push(comAction[key].type));

const comReducer = (state = INITIAL_STATE, action) => {
	
	if (possibleActionType.includes(action.type)) {
		
		const wrapper = QiWrapper.getInstanceSync();
		
		switch (action.type) {
			case comAction.setStepRecieved.type:
			
				wrapper.raise(generalManagerHRI.stepReceived.ALMemory, null);
				break;
			
			case comAction.stepCompleted.type:
		
				wrapper.raise(generalManagerHRI.stepCompleted.ALMemory, {step: action.step});
				break;
			
			case comAction.jsHeartBeat.type:
		
				wrapper.setALValue(common.jsHeartBeat.ALMemory, Date.now());
				break;
			
			case comAction.dataJs.type:
				
				if (action.data !== undefined)
				{
					
					const {ALMemory, dataType} = tabletLM.dataJs;
			
					// Check if the data to pass the name, the drink or the age of guest to LocalManager
					// if ([dataType.drink, dataType.name, dataType.age, dataType.].includes(action.dataType))
					
					
					const dataTypeKeys = Object.keys(dataType);
					const possibleDataType = [];
					
					dataTypeKeys.forEach(key => {
						possibleDataType.push(dataType[key]);
					});
					
					if (possibleDataType.includes(action.dataType)) {
						
						logger.log("sendData : send : ", action);
						wrapper.raise(ALMemory, {
							dataType: action.dataType,
							data: action.data
						});
					}
					
				}
			
			break;
			
			default:
				// console.warn("Unknown action on commmunication reducer", action);
				break;
			
		}
		
		
	}
	
	return state;
	
};

export {
	comReducer
}
