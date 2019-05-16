/**
 * @description this class is just a wrapper App Configs (Steps, drinks, ...)
 */

import ALMemoryEvent from '../config/almemoryEvent'
import QiWrapper from "../model/QiWrapper";
import globalConfig from '../config/global'
import drinks from '../config/drinks';
import names from '../config/people'
import scenario from '../config/scenario'
import Logger from "../dev/Logger";

/**
 * @description the almemory where is place the json with all informations about which Almemory is used by the App
 * @type {string}
 */
const CONFIG_ALMEMORY = "R2019/Global/ALMemoryConfig";


export default class ConfigWrapper
{
	// static #_steps = steps;
	static #_drinks;
	static #_names;
	
	static #_scenario;
	
	static #_AlMemoryEvent;
	

	
	static logger = new Logger(true, "ConfigWrapper");
	
	// static #_AlMemoryEvent ;
	
	static async setConfigFromALMemory() {
		
		
		if (globalConfig.naoqiIsPresent) {
			ConfigWrapper.logger.log("ConfigWrapper logged from Naoqi");
			
			
			ConfigWrapper.#_AlMemoryEvent = JSON.parse(await QiWrapper.getALValue(CONFIG_ALMEMORY));
			ConfigWrapper.#_drinks = JSON.parse(await QiWrapper.getALValue(ConfigWrapper.#_AlMemoryEvent.AL_VALUE.drinks));
			ConfigWrapper.#_names = JSON.parse(await QiWrapper.getALValue(ConfigWrapper.#_AlMemoryEvent.AL_VALUE.names));
			ConfigWrapper.#_scenario = JSON.parse(await QiWrapper.getALValue(ConfigWrapper.#_AlMemoryEvent.AL_VALUE.scenario));
		} else {
			
			ConfigWrapper.logger.log("ConfigWrapper logged from src");
			
			ConfigWrapper.#_AlMemoryEvent = ALMemoryEvent;
			ConfigWrapper.#_names = names;
			ConfigWrapper.#_drinks = drinks;
			ConfigWrapper.#_scenario = scenario;
			
		}
		
		
	}
	
	
	/**
	 *
	 * @return {{ALMemoryEvent, names, scenario, drinks}}
	 */
	static get() {
		
		
		return {
			drinks: ConfigWrapper.#_drinks,
			names: ConfigWrapper.#_names,
			ALMemoryEvent: ConfigWrapper.#_AlMemoryEvent,
			scenario: ConfigWrapper.#_scenario
		}
	}
	
}