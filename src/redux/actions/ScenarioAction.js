import ConfigWrapper from "../../controller/ConfigWrapper";

const {apis : {generalManagerHRI}} = ConfigWrapper.get();

export const scenarioAction = {
	currentScenario: {
		type: generalManagerHRI.currentScenario.reduxKey,
		scenario: "SCENARIO"
	}
};