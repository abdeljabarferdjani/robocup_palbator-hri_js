import ConfigWrapper from "../../controller/ConfigWrapper";

const {apis : {common}} = ConfigWrapper.get();

export const toolbarAction = {
	
	toolbarState: {
		type: common.toolbarState.reduxKey,
		state: {
			ok: common.toolbarState.state.ok,
			error: common.toolbarState.state.error
		},
		system: {
			...common.toolbarState.system
		}
	}
};


