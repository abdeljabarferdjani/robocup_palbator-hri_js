/**
 * @description this class is just a wrapper App Configs (Steps, drinks, ...)
 */

import QiWrapper from "../model/QiWrapper";
import Logger from "../dev/Logger";
import {deepFreeze} from "../dev/Tools";

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
	
	static #_videos;
	
	static #_locations;
	
	static #_apis;
	
	
	static logger = new Logger(true, "ConfigWrapper");
	
	// static #_AlMemoryEvent ;
	
	static async setConfigFromALMemory() {
		
		
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
				ConfigWrapper.#_apis.common["AL_VALUE"]["apis"]["generalManagerHRI"]
			)
		);
		
		
		ConfigWrapper.#_drinks = JSON.parse(
			await QiWrapper.getALValue(
				ConfigWrapper.#_apis.common["AL_VALUE"]["drinks"]
			)
		);
		
		ConfigWrapper.#_names = JSON.parse(
			await QiWrapper.getALValue(
				ConfigWrapper.#_apis.common["AL_VALUE"]["names"]
			)
		);
		
		ConfigWrapper.#_locations = JSON.parse(
			await QiWrapper.getALValue(
				ConfigWrapper.#_apis.common["AL_VALUE"]["locations"]
			)
		);
		
		const rawVideos = JSON.parse(
			await QiWrapper.getALValue(
				ConfigWrapper.#_apis.common["AL_VALUE"]["videos"]
			)
		);
		
		ConfigWrapper.#_videos = {};
		rawVideos.forEach(video => {
			ConfigWrapper.#_videos[video["id"]] = video['pathOnTablet']
		});
		
		deepFreeze(ConfigWrapper.get())
		
		
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
			videos: ConfigWrapper.#_videos,
			apis: {
				common: ConfigWrapper.#_apis.common,
				tabletLM: ConfigWrapper.#_apis.tabletLM,
				generalManagerHRI: ConfigWrapper.#_apis.generalManagerHRI
			}
		}
	}
	
}