import {scenarioAction} from '../actions/ScenarioAction';
import SocketWrapper from '../../model/SocketWrapper';

const INITIAL_STATE = {
	current: {
		name: "None"
	}
};


export const scenarioReducer = (state = INITIAL_STATE, action) => {
	
	const socket = new SocketWrapper();

		if (action.type === scenarioAction.currentScenario.type) {
			console.log(action.scenarioName)
			let scenarioName='';
			if (action.scenarioName === 'receptionist') scenarioName = 'Receptionist'
			if (action.scenarioName === 'present_school') scenarioName = 'Present School'
			if (action.scenarioName === 'take_out_the_garbage') scenarioName = 'Take Out The Garbage'
			if (action.scenarioName === 'inspection') scenarioName = 'Inspection'
			if (action.scenarioName === 'None') scenarioName = 'None'
			state = {
				
				...state,
				
				current: {
					name: scenarioName
				}
			};
	
			if(action.steps !== undefined){
				
				let steps_sorted = action.steps.sort((step1, step2) => {
					return step1['order'] < step2['order'] ? -1 : 1
				});
				socket._type.emit('currentViewHRIM',{
					data: steps_sorted,
					scenario_name: action.scenarioName
				});

				// steps_sorted.forEach((step, index) => {
				// 	if(step.speech !== undefined) text_to_show = step.speech.title
				// 	if(step.argument !== undefined) text_to_show = step.argument.title

				// 	console.log(text_to_show)
				// 	if(step.action !== ''){
						// socket._type.emit('currentViewHRIM',{
						// 	// data: step.action,
						// 	data: 'seatGuest',
						// 	time: step.eta,
						// 	title: text_to_show,
						// 	order: step.order,
						// 	id: index
						// });
				// 	}
				// })
			}

		}

	return state;
};