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
		
		
		if (action.type === toolbarAction.changeToolbar.type) {
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
		} else {
		}
		
		
	}
	
	
	return state;
};

export {
	toolbarReducer
}