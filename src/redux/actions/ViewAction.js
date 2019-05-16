export const viewAction = {
	changeView: {
		type: "CHANGE_VIEW",
		views: {
			servingDrinks : {

				findDrinks: "CHANGE_VIEW/SERVING_DRINKS/FIND_DRINK",
				deliverDrink: "CHANGE_VIEW/SERVING_DRINKS/DELIVER_DRINK",
				detailDrink: "CHANGE_VIEW/SERVING_DRINKS/DETAIL_DRINK",
			},
			receptionist : {
				askAge : "CHANGE_VIEW/RECEPTIONIST/ASK_AGE",
				presentPeople : "CHANGE_VIEW/RECEPTIONIST/PRESENT_PEOLPLE",
				olderOnSofa: "CHANGE_VIEW/RECEPTIONIST/OLDER_ON_SOFA"
			},
			global : {
				moving: "CHANGE_VIEW/GLOBAL/MOVING",
				askName: "CHANGE_VIEW/GLOBAL/ASK_NAME",
				askDrink: "CHANGE_VIEW/GLOBAL/ASK_DRINK",
				idle: "CHANGE_VIEW/GLOBAL/NONE"
			},
			
			
		},
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
