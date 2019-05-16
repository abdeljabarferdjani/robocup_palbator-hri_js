import ConfigWrapper from "../../controller/ConfigWrapper";

const {ALMemoryEvent} = ConfigWrapper.get();

export const toolbarAction = {
	
	changeToolbar: {
		type: ALMemoryEvent.changeToolbar.reduxKey,
		state: {
			ok: ALMemoryEvent.changeToolbar.state.ok,
			error: ALMemoryEvent.changeToolbar.state.error
		},
		payload: {
			internet: "INTERNET",
			pcConnection: "PC_CONNECTION",
			micro: "MICRO",
			canMove: "CAN_MOVE",
		}
	}
};


