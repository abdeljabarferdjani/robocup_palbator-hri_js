import {toolbarAction} from '../actions/ToolbarAction'

const INITIAL_STATE = {
	// internet: undefined,
	// pcConnection: undefined,
	// micro: undefined,
	// canMove: undefined
	internet: toolbarAction.toolbarState.state.error,
	pcConnection: toolbarAction.toolbarState.state.ok,
	micro: toolbarAction.toolbarState.state.error,
	canMove: toolbarAction.toolbarState.state.ok
};


const possibleActionTypes = [];
Object.keys(toolbarAction).forEach(key => possibleActionTypes.push(toolbarAction[key].type));

const toolbarReducer = (state = INITIAL_STATE, action) => {
	
	
	if (possibleActionTypes.includes(action.type)) {
		
		
		if (action.type === toolbarAction.toolbarState.type) {
			const value = action.state;
			let actionPayload = toolbarAction.toolbarState.system;
			const payloads = Object.keys(actionPayload);
			for (const p of payloads) {
				if (actionPayload[p] === action.system) {
					state = {
						...state,
						[p]: value,
					}
				}
			}
		} else {
		}
		
		
	}
	
	
	return state;
};

export {
	toolbarReducer
}