import ConfigWrapper from "../../controller/ConfigWrapper";

const {apis: {tabletLM}} = ConfigWrapper.get();

export const viewAction = {
	changeView: {
		type: tabletLM.currentView.reduxKey
	},
	
	
	setComponentVisibility: {
		type: "SET_COMPONENT_VISIBILITY",
		component: {
			timeBoard: "TIMEBOARD"
		},
		state: {
			visible: "VISIBLE",
			hidden: "HIDE"
		}
	},

	getIndexCurrentAction: {
		type: "INDEX_CURRENT_ACTION"
	}
	
};
