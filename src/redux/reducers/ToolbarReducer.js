import {toolbarAction} from '../actions/ToolbarAction'

const INITIAL_STATE = {
	// internet: undefined,
	// pcConnection: undefined,
	// micro: undefined,
	// canMove: undefined
	internet: toolbarAction.changeToolbar.state.error,
	pcConnection: toolbarAction.changeToolbar.state.ok,
	micro: toolbarAction.changeToolbar.state.error,
	canMove: toolbarAction.changeToolbar.state.ok
};


const possibleActionTypes = [];
Object.keys(toolbarAction).forEach(key => possibleActionTypes.push(toolbarAction[key].type));

const toolbarReducer = (state = INITIAL_STATE, action) => {
	
	
	if (possibleActionTypes.includes(action.type)) {
		
		
		switch (action.type) {
			case toolbarAction.changeToolbar.type:
				
				const value = action.state;
				
				let actionPayload = toolbarAction.changeToolbar.payload;
				const payloads = Object.keys(actionPayload);
				
				for (const p of payloads) {
					if (actionPayload[p] === action.system) {
						state = {
							...state,
							[p]: value,
						}
					}
				}
				break;
			
			default:
				break;
		}
		
		
	}
	
	
	return state;
};

export {
	toolbarReducer
}