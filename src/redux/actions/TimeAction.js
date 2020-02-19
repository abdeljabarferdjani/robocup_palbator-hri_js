import ConfigWrapper from "../../controller/ConfigWrapper";

const {apis: {generalManagerHRI}} = ConfigWrapper.get();


export const timeAction = {
	passSecond: {
		type: "PASS_A_SECOND",
		globalElapsedTime: 0
	},
	
	currentStep: {
		type: generalManagerHRI.currentStep.reduxKey,
	},
	
	stepSkipped: {
		type: generalManagerHRI.stepSkipped.reduxKey,
	},
	
	stepCompleted: {
		type: generalManagerHRI.stepCompleted.reduxKey,
	},
	timerState: {
		type: generalManagerHRI.timerState.reduxKey,
		state: generalManagerHRI.timerState.state,
	},
	
	resetStepsProgression: {
		type: "R2019/Timeboard/ResetStepsProgression",
	},
	
	replaceAllSteps: {
		type: "REPLACE_ALL_STEPS",
		steps: ["Steps"]
	},

	putOneStep: {
		type: "PUT_ONE_STEP"
	}
	
	
};

