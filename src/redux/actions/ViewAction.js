export const viewAction = {
	changeView: {
		type: "CHANGE_VIEW",
	},
	
	moveView: {
		type: "MOVE_VIEW",
		moveTo: {
			human: "MOVE_TO_HUMAN",
			place: "MOVE_TO_PLACE"
		}
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
	}
	
};
