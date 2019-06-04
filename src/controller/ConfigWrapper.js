/**
 * @description this class is just a wrapper App Configs (Steps, drinks, ...)
 */

import QiWrapper from "../model/QiWrapper";
import globalConfig from '../config/global'
import drinks from '../config/drinks';
import names from '../config/people'
import scenario from '../config/scenario'
import Logger from "../dev/Logger";
// import ALMemoryEvent from '../config/almemoryEvent'

/**
 * @description the almemory where is place the json with all informations about which Almemory is used by the App
 * @type {string}
 */
const CONFIG_ALMEMORY = "R2019/Api/Common";


export default class ConfigWrapper
{
	// static #_steps = steps;
	static #_drinks;
	static #_names;
	
	static #_scenario;
	
	static #_locations
	
	static #_apis;
	
	
	static logger = new Logger(true, "ConfigWrapper");
	
	// static #_AlMemoryEvent ;
	
	static async setConfigFromALMemory() {
		
		
		if (globalConfig.naoqiIsPresent) {
			ConfigWrapper.logger.log("ConfigWrapper logged from Naoqi");
			
			
			ConfigWrapper.#_apis = {
				common: JSON.parse(await QiWrapper.getALValue(CONFIG_ALMEMORY)),
				tabletLM: null,
				generalManagerHRI: null
			};
			
			ConfigWrapper.#_apis.tabletLM = JSON.parse(
				await QiWrapper.getALValue(
					ConfigWrapper.#_apis.common.AL_VALUE.apis.tabletLM
				)
			);
			
			ConfigWrapper.#_apis.generalManagerHRI = JSON.parse(
				await QiWrapper.getALValue(
					ConfigWrapper.#_apis.common.AL_VALUE.apis.generalManagerHRI
				)
			);
			
			
			ConfigWrapper.#_drinks = JSON.parse(
				await QiWrapper.getALValue(
					ConfigWrapper.#_apis.common.AL_VALUE.drinks
				)
			);
			
			ConfigWrapper.#_names = JSON.parse(
				await QiWrapper.getALValue(
					ConfigWrapper.#_apis.common.AL_VALUE.names
				)
			);
			
			ConfigWrapper.#_locations = JSON.parse(
				await QiWrapper.getALValue(
					ConfigWrapper.#_apis.common.AL_VALUE.locations
				)
			);
			
			// --- Scenario ---
			// ConfigWrapper.#_scenario = JSON.parse(
			// 	await QiWrapper.getALValue(
			// 		ConfigWrapper.#_apis.common.AL_VALUE.scenario
			// 	)
			// );
			//
			// const scenarioKeys = Object.keys(ConfigWrapper.#_scenario);
			// scenarioKeys.forEach(scenarKey => {
			//
			// 	let order = 0;
			// 	const stepsKeys = Object.keys(ConfigWrapper.#_scenario[scenarKey].steps);
			// 	stepsKeys.forEach(stepKey => {
			// 		// todo make order great again in new scenario
			// 		ConfigWrapper.#_scenario[scenarKey].steps[stepKey].order = order++;
			// 	})
			// });
			
			
		} else {
			
			ConfigWrapper.logger.log("ConfigWrapper logged from src");
			
			// ConfigWrapper.#_CommonApi = ALMemoryEvent;
			ConfigWrapper.#_names = names;
			ConfigWrapper.#_drinks = drinks;
			ConfigWrapper.#_scenario = scenario;
			// ConfigWrapper.#_views = views;
			
		}
		
		
	}
	
	
	/**
	 *
	 * @return {{apis : {common, tabletLM, generalManagerHRI}, names, locations, drinks}}
	 */
	static get() {
		
		
		return {
			drinks: ConfigWrapper.#_drinks,
			names: ConfigWrapper.#_names,
			locations: ConfigWrapper.#_locations,
			apis: {
				common: ConfigWrapper.#_apis.common,
				tabletLM: ConfigWrapper.#_apis.tabletLM,
				generalManagerHRI: ConfigWrapper.#_apis.generalManagerHRI
			}
		}
	}
	
}