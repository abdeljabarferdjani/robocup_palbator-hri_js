import ConfigWrapper from "../../controller/ConfigWrapper";

const {ALMemoryEvent} = ConfigWrapper.get();

export const scenarioAction = {
	changeCurrentScenario: {
		type: ALMemoryEvent.changeCurrentScenario.reduxKey,
		scenario: "SCENARIO"
	}
};