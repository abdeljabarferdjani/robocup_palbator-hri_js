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
	
	static #_imPepper = false;
	
	
	static logger = new Logger(true, "ConfigWrapper");
	
	// static #_AlMemoryEvent ;
	
	static init() {
		const agent = navigator.userAgent
		
		// todo to get Navigator version
		// alert(agent);
		
		const allowedVersion = [
			"Chrome/44.0.2403.157", // Pepper 1.8a
			"Chrome/39.0.2171.71"   // Pepper 1.6
		];
		allowedVersion.forEach(v => {
			ConfigWrapper.#_imPepper = ConfigWrapper.#_imPepper || agent.includes(v);
		});
		console.log("init done", ConfigWrapper.#_imPepper)
	}
	
	static async setConfigFromALMemory() {
		
		ConfigWrapper.init();
		
		try {
			ConfigWrapper.#_apis = {
				common: JSON.parse(await QiWrapper.getALValue(CONFIG_ALMEMORY)),
				tabletLM: null,
				generalManagerHRI: null
			};
			
			ConfigWrapper.#_apis.tabletLM = JSON.parse(
				await QiWrapper.getALValue(
					ConfigWrapper.#_apis.common["AL_VALUE"]["apis"]["tabletLM"]
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
			const got = ConfigWrapper.get()
			deepFreeze(got);
			ConfigWrapper.logger.log("ConfigWrapper logged from Naoqi", got);
			
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
	 * @return {{apis : {common, tabletLM, generalManagerHRI}, imPepper, images, locations,  videos}}
	 */
	static get() {
		
		console.log("GET", ConfigWrapper.#_locations)
		
		return {
			locations: ConfigWrapper.#_locations,
			videos: ConfigWrapper.#_videos,
			images: ConfigWrapper.#_images,
			imPepper: ConfigWrapper.#_imPepper,
			apis: {
				common: ConfigWrapper.#_apis.common,
				tabletLM: ConfigWrapper.#_apis.tabletLM,
				generalManagerHRI: ConfigWrapper.#_apis.generalManagerHRI
			}
		}
	}
	
}