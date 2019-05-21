import {comAction} from "../actions/CommunicationAction";
import QiWrapper from "../../model/QiWrapper";
import Logger from "../../dev/Logger";
import logConfig from '../../config/log'
import ConfigWrapper from "../../controller/ConfigWrapper";


const {ALMemoryEvent, } = ConfigWrapper.get();

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
				/**
				 *  action : {
				 *      type : almemoryEvent.setStepRecieved.alMemory,
				 *  }
				 */
				wrapper.raise(ALMemoryEvent.setStepRecieved.ALMemory, null);
				break;
			
			case comAction.setStepCompleted.type:
				/**
				 *  action : {
				 *      type : almemoryEvent.setStepCompleted.alMemory,
				 *      step : STEP
				 *  }
				 */
				wrapper.raise(ALMemoryEvent.setStepCompleted.ALMemory, {step : action.step});
				break;
			
			case comAction.heartbeats.type:
				/**
				 *  action : {
				 *      type : almemoryEvent.heartbeats.alMemory,
				 *  }
				 */
				wrapper.setALValue(ALMemoryEvent.heartbeats.ALMemory, Date.now());
				break;
			
			case comAction.sendData.type:
				
				const {dataType, ALMemory} = ALMemoryEvent.sendDataJs;
				/**
				 *  action : {
				 *      type : almemoryEvent.sendata.type
				 *      dataType : almemoryEvent.sendData.dataType.drink | almemoryEvent.sendData.dataType.name
				 *      data : JSON object with the name or the drink (depends of the dataType)
				 *  }
				 */
				
				// Check if the data to pass the name, the drink or the age of guest to LocalManager
				if ([dataType.drink, dataType.name, dataType.age].includes(action.dataType))
				{
					if (action.data !== undefined)
					{
						logger.log("sendData : send : ", action);
						wrapper.raise(ALMemory, {
							dataType : action.dataType,
							data : action.data
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
