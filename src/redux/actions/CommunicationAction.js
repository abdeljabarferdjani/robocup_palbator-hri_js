import ConfigWrapper from "../../controller/ConfigWrapper";

const {ALMemoryEvent} = ConfigWrapper.get();

export const comAction = {
	setStepRecieved: {
		type: ALMemoryEvent.setStepRecieved.reduxKey,
	},
	
	setStepCompleted: {
		type: ALMemoryEvent.setStepCompleted.reduxKey,
		mode: {
			user: "WORK_DONE/USER",
			drink: "WORK_DONE/DRINK"
		},
	},
	heartbeats: {
		type: ALMemoryEvent.sendHeartbeat.reduxKey,
		time: "timestamp"
	},
	sendData: {
		type: ALMemoryEvent.sendDataJs.reduxKey,
		dataType: ALMemoryEvent.sendDataJs.dataType,
		data: ""
		
	},
	
	
};


