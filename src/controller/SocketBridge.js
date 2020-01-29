// Singleton javascript ES6 
import React, { Component } from 'react';
// import socketIOClient from "socket.io-client";
import SocketWrapper from '../model/SocketWrapper';
import {dispatch, store} from '../redux/Store'
import debug from '../config/log';
import {viewAction} from "../redux/actions/ViewAction";
import ConfigWrapper from "./ConfigWrapper";
import {timeAction} from "../redux/actions/TimeAction";
// import Logger from "../dev/Logger";
import {toolbarAction} from "../redux/actions/ToolbarAction";
import {scenarioAction} from "../redux/actions/ScenarioAction";
import {comAction} from "../redux/actions/CommunicationAction";
// import {connect} from 'react-redux';
import PropTypes from "prop-types";

const {apis: {tabletLM, common, generalManagerHRI}} = ConfigWrapper.get();
const indexesStepCompleted = [];
const arrayStep = [];
/**
 *
 * @return {[Object]}
 */
const getScenarioSteps = () => {
	return store.getState().scenario.current.steps;
};


/**
 *
 * @returns {Object | undefined}
 * @param name
 */
const getStepByName = (name) => {
	const steps = getScenarioSteps();
	return steps[steps.findIndex(step => step.name = name)];
	
};

export {
	getScenarioSteps,
	getStepByName
}


/**
 * @description this class is the link between ALMemory's and Redux
 */
export default class SocketBridge extends React.Component{
	// static logger = new Logger(debug.ALMemoryBridge, "AlMemoryBridge");

    constructor(props) {
        super(props);
        this.state = {
						response: false,
            // socket: socketIOClient("http://127.0.0.1:5000"),
        };
        // Cette liaison est nécéssaire afin de permettre
        // l'utilisation de this dans la fonction de rappel.
        // this.handleClick = this.handleClick.bind(this);
    }

    // handleClick() {
    //     const { socket } = this.state;
    //     socket.emit('my SECOND EVENT', { data: 'I\'m connected!' });
    // }

		static initBridge = () => {
			const toolbarState = common.toolbarState;

			const socket = new SocketWrapper();

      socket._type.emit('socketBridge');
				

			Promise.all([
				
				// socket._type.on('toolbarState', this.handleToolbarChange(toolbarState)),
				socket._type.on('currentStep', this.handleChangeCurrentStep()),
				socket._type.on('stepCompleted', this.handleStepCompleted(indexesStepCompleted)),
				// socket._type.on('stepSkipped', this.handleSetStepSkipped()),
				socket._type.on('timerState', this.handleToggleTimer()),
				socket._type.on('currentScenario', this.handleChangeCurrentScenario()),
				socket._type.on('currentView', this.handleChangeCurrentView()),
				socket._type.on('endScenario', this.handleChangeEndScenario()),
				// socket._type.on('resetSteps', this.handleResetSteps()),

				// QiWrapper.listen(toolbarState["ALMemory"], this.handleToolbarChange(toolbarState)),
				// QiWrapper.listen(generalManagerHRI["currentStep"]["ALMemory"], this.handleChangeCurrentStep()),
				// QiWrapper.listen(generalManagerHRI["stepCompleted"]["ALMemory"], this.handleStepCompleted()),
				// QiWrapper.listen(generalManagerHRI["stepSkipped"]["ALMemory"], this.handleSetStepSkipped()),
				// QiWrapper.listen(generalManagerHRI["timerState"]["ALMemory"], this.handleToggleTimer()),
				// QiWrapper.listen(generalManagerHRI["currentScenario"]["ALMemory"], this.handleChangeCurrentScenario()),
				// QiWrapper.listen(tabletLM["currentView"]["ALMemory"], this.handleChangeCurrentView()),
				// QiWrapper.listen(generalManagerHRI["resetSteps"]["ALMemory"], this.handleResetSteps())

		]).then(() => {
			setInterval(async () => {
				// await QiWrapper.raise(common.jsHeartbeat["ALMemory"], {'time': Date.now()});
				
				// dispatch({
				// 	'type': comAction.extHeartbeat.type,
				// 	'time': {
				// 		lm: JSON.parse(await QiWrapper.getALValue(common["localManagerHeartbeat"]["ALMemory"])).time,
				// 		// gm: JSON.parse(await QiWrapper.getALValue(common.generalManagerHeartbeat.ALMemory)).time
				// 	}
				// })
				
				
			}, 1000)
		})
		
		
	};
	
	
	static handleChangeCurrentScenario = () => (data) => {
		
		// ALMemoryBridge.logger.log("handleChangeCurrentScenario", data)

		dispatch({
			type: scenarioAction.currentScenario.type,
			scenarioName: data.scenario,
			steps: data.stepsList
		});

		dispatch({
			type: timeAction.replaceAllSteps.type,
			steps: data.stepsList
		})

	};
	
	static handleToggleTimer = () => (data) => {
		console.log(data)
		console.log(timeAction)
		if ([timeAction.timerState.state.on, timeAction.timerState.state.off].includes(data.state)) {
			dispatch({
				type: timeAction.timerState.type,
				state: data.state
			})
		} else {
			// ALMemoryBridge.logger.warn("Unknown mode for timerState");
		}
	};
	
	static handleSetStepSkipped = () => (data) => {
		// ALMemoryBridge.logger.log("handleSetStepSkipped", data)
		dispatch({
			type: timeAction.stepSkipped.type,
			indexes: data.indexes
		})
	};
	
	static handleStepCompleted = indexesStepCompleted => data => {
		// ALMemoryBridge.logger.log("handleStepCompleted", data)
		if(indexesStepCompleted !== []) indexesStepCompleted.pop()
		indexesStepCompleted.push(data.idSteps)
		console.log(indexesStepCompleted)
		dispatch({
			type: timeAction.stepCompleted.type,
			indexes: indexesStepCompleted
		})
		
	};
	
	static handleChangeCurrentView = () => data => {
		

		if(arrayStep !== []) arrayStep.pop()
		arrayStep.push(data.step)
		console.log(arrayStep)
		if (data.view !== undefined || data.data !== undefined) {
			dispatch({
				type: timeAction.putOneStep.type,
				steps: arrayStep
			})
			
			dispatch({
				type: viewAction.changeView.type,
				view: data.view,
				data: data.data
			})
		}
		
	};

	static handleChangeCurrentStep = () => (data) => {
		// ALMemoryBridge.logger.log("handleStepCompleted", data)
		if(arrayStep !== []) arrayStep.pop()
		arrayStep.push(data.step)
		console.log(arrayStep)
		dispatch({
			type: timeAction.putOneStep.type,
			steps: arrayStep
		})

		dispatch({
			type: timeAction.currentStep.type,
			index: data.index,
			step:data.step
		})

		
	};

	static handleChangeEndScenario = () => (data) => {
		dispatch({
			type: scenarioAction.currentScenario.type,
			scenarioName: data.scenario,
			steps: data.stepsList
		});

		dispatch({
			type: timeAction.replaceAllSteps.type,
			steps: data.stepsList
		})
		
		dispatch({
			type: viewAction.changeView.type,
			view: null,
			data: null
		})
	};
	
	static handleToolbarChange = changeToolbar => data => {
		// ALMemoryBridge.logger.log("handleToolbarChange", data)
		
		const possibleState = [changeToolbar.state.ok, changeToolbar.state.error];
		
		if (possibleState.includes(data.state)) {
			const possibleSystems = [];
			const systemKeys = Object.keys(changeToolbar.system);
			systemKeys.forEach(key => {
				possibleSystems.push(common.toolbarState.system[key])
			});
			
			if (possibleSystems.includes(data.system)) {
				dispatch({
					type: toolbarAction.toolbarState.type,
					system: data.system,
					state: data.state
				})
			} else {
				// ALMemoryBridge.logger.warn("Listen toolbarState", "Unknown data.system")
			}
		} else {
			// ALMemoryBridge.logger.warn("Listen toolbarState", "Unknown data.state")
		}
	};
	
	static handleResetSteps = () => data => {
		// ALMemoryBridge.logger.log("handleResetSteps", data)
		dispatch({
			type: timeAction.resetStepsProgression.type,
			state: true
		})
	}
}