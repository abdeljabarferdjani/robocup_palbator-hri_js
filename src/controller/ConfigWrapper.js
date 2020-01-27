/**
 * @description this class is just a wrapper App Configs (Steps, drinks, ...)
 */

// import QiWrapper from "../model/QiWrapper";
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
				common: {
          "prefix": "R2019",
          "AL_VALUE": {
              "drinks": "R2019/Global/Drinks",
              "names": "R2019/Global/Names",
              "locations": "R2019/Global/Locations",
              "guests": "R2019/Receptionist/Guests",
              "images": "R2019/Global/Images",
              "videos": "R2019/Global/Videos",
              "apis": {
                  "common": "R2019/Api/Common",
                  "generalManagerHRI": "R2019/Api/GeneralManagerHRI",
                  "tabletLM": "R2019/Api/TabletLM"
              }
          },
          "toolbarState": {
              "ALMemory": "R2019/Global/ChangeToolbar",
              "reduxKey": "CHANGE_TOOLBAR",
              "state": {
                  "ok": "OK",
                  "error": "ERROR"
              },
              "system": {
                  "internet": "INTERNET",
                  "pcConnection": "PC_CONNECTION",
                  "micro": "MICRO",
                  "canMove": "CAN_MOVE"
              }
          },
        
      
          "jsHeartbeat": {
              "ALMemory": "R2019/Global/JsHearbeat",
              "reduxKey": "HEART_BEAT",
              "payload": "__timestamp"
          },
      
          "localManagerHeartbeat": {
              "ALMemory": "R2019/Global/LMHearbeat",
              "payload": "__timestamp"
          },
      
          "generalManagerHeartbeat": {
              "ALMemory": "R2019/Global/GMHearbeat",
              "payload": "__timestamp"
          }
      },
				tabletLM: null,
				generalManagerHRI: null
			};
			
		// 	// ConfigWrapper.#_apis.tabletLM = JSON.parse(
		// 	// 	await QiWrapper.getALValue(
		// 	// 		ConfigWrapper.#_apis.common["AL_VALUE"]["apis"]["tabletLM"]
		// 	// 	)
    // 	// );
      ConfigWrapper.#_apis.tabletLM = {
        "tabletOperational": {
            "ALMemory": "R2019/Global/SendTabletOperational",
            "time": "__timestamp"
        },
    
        "currentView": {
            "ALMemory": "R2019/Global/CurrentView",
            "reduxKey": "ChangeCurrentView",
            "view":  "__viewKey",
            "data": "_data"
        },
    
        "dataJs": {
            "ALMemory": "R2019/Receptionist/SendDataJs",
            "reduxKey": "SendData",
            "dataType": {
                "name": "DATA/NAME",
                "drink": "DATA/DRINK",
                "age": "DATA/AGE",
                "confirm": "DATA/CONFIRM"
            },
            "data": "__DATA"
        },
      
        "dataPython": {
            "ALMemory": "R2019/Receptionist/SendDataPython",
            "dataType": {
                "name": "DATA/NAME",
                "drink": "DATA/DRINK",
                "age": "DATA/AGE"
            },
            "data": "__DATA"
        },
        "localManagerLogger": {
        "ALMemory": "R2019/Global/LmLogger",
        "message": "string",
        "application": "string",
        "level": {
          "HEARTBEAT": 0,
          "EVENT": 1,
          "DEBUG": 2,
          "INFO": 3,
          "WARNING": 4,
          "ERROR": 5,
          "CRITIAL": 6
        }
      }
    }
			
			ConfigWrapper.#_apis.generalManagerHRI = {
        "currentScenario": {
            "ALMemory": "R2019/Global/stepsList",
            "reduxKey": "currentScenario",
            "scenario": "__SCENARIO"
        },
        "currentStep": {
            "ALMemory": "R2019/Global/currentStep",
            "reduxKey": "currentStep",
            "stepId": "__STEP_ID"
        },
        "resetSteps": {
            "ALMemory":"R2019/Global/resetSteps",
            "reduxKey": "resetSteps"
        },
        "stepSkipped": {
            "ALMemory": "R2019/Global/stepSkipped",
            "reduxKey": "stepSkipped",
            "stepId": "__STEP_ID"
        },
        "stepCompleted": {
            "ALMemory": "R2019/Global/stepDone",
            "reduxKey": "stepCompleted",
            "stepId": "__STEP_ID"
        },
        "stepReceived": {
            "reduxKey": "stepReceived",
            "ALMemory": "R2019/Global/stepReceived"
        },
        "timerState": {
            "ALMemory": "R2019/Global/toggleTimer",
            "reduxKey": "toggleTimer",
            "state": {
                "on": "TOGGLE_TIMER/ON",
                "off": "TOGGLE_TIMER/OFF"
            }
        },
        "currentAction": {
            "ALMemory": "R2019/Global/CurrentAction",
            "actionId": "__Step_ID"
        },
        "askToChangeScenario": {
            "ALMemory": "R2019/Global/AskToChangeScenario",
            "reduxKey": "askToChangeScenario",
            "scenario": "_scenarioName"
        },
        "actionComplete": {
            "ALMemory": "R2019/Global/ActionComplete",
            "reduxKey": "actionComplete"
        }
    };
			
      
    ConfigWrapper.#_images = [{"id": "cpe", "pathOnTablet": "img/images/cpe.png", "name": "Cpe"}, {"id": "liris", "pathOnTablet": "img/images/liris.png", "name": "Liris"}, {"id": "insa", "pathOnTablet": "img/images/insa.png", "name": "Insa"}, {"id": "lyontech", "pathOnTablet": "img/images/lyontech.png", "name": "lyontech"}, {"id": "inria", "pathOnTablet": "img/images/inria.png", "name": "Inria"}, {"id": "citi", "pathOnTablet": "img/images/citi.png", "name": "Citi"}];
		// 	// ConfigWrapper.#_images = JSON.parse(
		// 	// 	await QiWrapper.getALValue(
		// 	// 		ConfigWrapper.#_apis.common['AL_VALUE']['images']
		// 	// 	)
		// 	// );
      
    ConfigWrapper.#_locations = [{"id": "bar", "pathOnTablet": "img/locations/bar.png", "name": "Bar"}, {"id": "livingRoom", "pathOnTablet": "img/locations/livingRoom.png", "name": "Living room"}, {"id": "entrance", "pathOnTablet": "img/locations/entrance.png", "name": "Entrance"}, {"id": "bin1", "pathOnTablet": "img/locations/bin.png", "name": "Bin 1"}, {"id": "bin2", "pathOnTablet": "img/locations/bin2.png", "name": "Bin 2"}, {"id": "collectionZone", "pathOnTablet": "img/locations/collectionZone.png", "name": "Collection Zone"}];
			// ConfigWrapper.#_locations = JSON.parse(
			// 	await QiWrapper.getALValue(
			// 		ConfigWrapper.#_apis.common["AL_VALUE"]["locations"]
			// 	)
			// );
			
			// const rawVideos = JSON.parse(
			// 	await QiWrapper.getALValue(
			// 		ConfigWrapper.#_apis.common["AL_VALUE"]["videos"]
			// 	)
			// );
			
		// 	ConfigWrapper.#_videos = {};
		// 	// rawVideos.forEach(video => {
		// 	// 	ConfigWrapper.#_videos[video["id"]] = video['pathOnTablet']
		// 	// });
			const got = ConfigWrapper.get()
			deepFreeze(got);
			// ConfigWrapper.logger.log("ConfigWrapper logged from Naoqi", got);
			
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
		
		
		return {
		locations: ConfigWrapper.#_locations,
		// 	videos: ConfigWrapper.#_videos,
			images: ConfigWrapper.#_images,
		// 	imPepper: ConfigWrapper.#_imPepper,
			apis: {
				common: ConfigWrapper.#_apis.common,
				tabletLM: ConfigWrapper.#_apis.tabletLM,
				generalManagerHRI: ConfigWrapper.#_apis.generalManagerHRI
			}
		}
	}
	
}