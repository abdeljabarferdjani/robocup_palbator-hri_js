/**
 * @description this class is just a wrapper App Configs (Steps, drinks, ...)
 */

import QiWrapper from "../model/QiWrapper";
import Logger from "../dev/Logger";
import {deepFreeze} from "../dev/Tools";
import React from "react";
import ReactDOM from 'react-dom'

/**
 * @description the almemory where is place the json with all informations about which Almemory is used by the App
 * @type {string}
 */
const CONFIG_ALMEMORY = "R2019/Api/Common";


export default class ConfigWrapper
{
	// static #_steps = steps;
	
	static #_videos;
	
	static #_locations;
	static #_images;
	static #_apis;
	
	
	static logger = new Logger(true, "ConfigWrapper");
	
	// static #_AlMemoryEvent ;
	
	static async setConfigFromALMemory() {
		
		
		ConfigWrapper.logger.log("ConfigWrapper logged from Naoqi");
		
		try {
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
			
			
	
			
		
			
			ConfigWrapper.#_images = JSON.parse(
				await QiWrapper.getALValue(
					ConfigWrapper.#_apis.common['AL_VALUE']['images']
				)
			)
			
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
			console.log("CONFIG", ConfigWrapper.get())
		} catch (e) {
			console.error("Error in ConfigWrapper", e);
			const style = {
				backgroundColor: "#FFF",
				color: "#F00",
				display: "block",
				position: "absolute",
				top: 0,
				left: 0
			};
			
			ReactDOM.render(<p style={style}>Error while initialising ALMemory
				(Config) : can't read Common API in ALMemories, make sure that
				Local manager is started</p>, document.querySelector("body"));
			console.log("Done")
			
		}
		
		
	}
	
	
	/**
	 *
	 * @return {{apis : {common, tabletLM, generalManagerHRI},  images, locations,  videos}}
	 */
	static get() {
		
		
		return {
			locations: ConfigWrapper.#_locations,
			videos: ConfigWrapper.#_videos,
			images : ConfigWrapper.#_images,
			apis: {
				common: ConfigWrapper.#_apis.common,
				tabletLM: ConfigWrapper.#_apis.tabletLM,
				generalManagerHRI: ConfigWrapper.#_apis.generalManagerHRI
			}
		}
	}
	
}