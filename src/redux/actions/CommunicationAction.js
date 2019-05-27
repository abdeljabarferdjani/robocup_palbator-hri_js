import ConfigWrapper from "../../controller/ConfigWrapper";

const {apis : {generalManagerHRI, common, tabletLM}} = ConfigWrapper.get();

export const comAction = {
	stepReceived: {
		type: generalManagerHRI.stepReceived.reduxKey,
	},
	
	stepCompleted: {
		type: generalManagerHRI.stepCompleted.reduxKey,
		mode: {
			user: "WORK_DONE/USER",
			drink: "WORK_DONE/DRINK"
		},
	},
	jsHeartbeat: {
		type: common.jsHeartbeat.reduxKey,
		time: "__timestamp"
	},
	dataJs: {
		type: tabletLM.dataJs.reduxKey,
		dataType: tabletLM.dataJs.dataType,
		data: ""
		
	},
	
	extHeartbeat : {
		type : "COM/EXT_HEARTBEAT",
		time : {
			gm : "_gmTimestamp",
			lm : "_lmTimestamp"
		}
	}
	
	
};


