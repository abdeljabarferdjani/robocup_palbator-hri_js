import ConfigWrapper from "../../controller/ConfigWrapper";

const {apis: {generalManagerHRI, common, tabletLM}} = ConfigWrapper.get();

export const comAction = {
	stepReceived: {
		type: generalManagerHRI.stepReceived.reduxKey,
	},
	
	// Never raise this event, @see dataJs
	stepCompleted: {
		type: generalManagerHRI.stepCompleted.reduxKey,
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
	
	extHeartbeat: {
		type: "COM/EXT_HEARTBEAT",
		time: {
			gm: "_gmTimestamp",
			lm: "_lmTimestamp"
		}
	},
	
	askToChangeScenario: {
		type: generalManagerHRI.askToChangeScenario.reduxKey,
		scenario: [
			{
				"id": "receptionist",
				"name": "Receptionist"
			},
			{
				"id": "take_out_the_garbage",
				"name": "Take out the garbage"
			},
			{
				"id": "inspection",
				"name": "Inspection"
			}
		]
	},
	
	
};


