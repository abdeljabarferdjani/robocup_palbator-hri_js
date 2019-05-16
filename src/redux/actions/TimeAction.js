import ConfigWrapper from "../../controller/ConfigWrapper";

const {ALMemoryEvent} = ConfigWrapper.get();


export const timeAction = {
	passSecond: {
		type: "PASS_A_SECOND",
		globalElapsedTime: 0
	},
	
	/*
	@value step : a step name from jsonSteps.json in config directory
	 */
	changeCurrentStep: {
		type: ALMemoryEvent.changeCurrentStep.reduxKey,
		step: ""
	},
	
	setStepSkipped: {
		type: ALMemoryEvent.setStepSkipped.reduxKey,
		step: ""
	},
	
	setStepCompleted: {
		type: ALMemoryEvent.setStepCompleted.reduxKey,
		step: ""
	},
	toggleTimer: {
		type: ALMemoryEvent.toggleTimer.reduxKey,
		mode: ALMemoryEvent.toggleTimer.mode,
	},
	
	replaceAllSteps : {
		type: "REPLACE_ALL_STEPS",
		steps : ["Steps"]
	}
	
};

