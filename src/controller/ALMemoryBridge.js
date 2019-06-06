import {dispatch, store} from '../redux/Store'
import debug from '../config/log';
import {viewAction} from "../redux/actions/ViewAction";
import ConfigWrapper from "./ConfigWrapper";
import QiWrapper from "../model/QiWrapper";
import {timeAction} from "../redux/actions/TimeAction";
import Logger from "../dev/Logger";
import {toolbarAction} from "../redux/actions/ToolbarAction";
import {scenarioAction} from "../redux/actions/ScenarioAction";
import {comAction} from "../redux/actions/CommunicationAction";


const {apis: {tabletLM, common, generalManagerHRI}} = ConfigWrapper.get();

/**
 *
 * @return {[Object]}
 */
const getScenarioSteps = () => {
	return store.getState().scenario.current.steps;
};


/**
 *
 * @param id
 * @returns {Object | undefined}
 */
const getStepById = (id) => {
	const steps = getScenarioSteps();
	return steps[steps.findIndex(step => step.id = id)];
	
};

export {
	getScenarioSteps,
	getStepById
}


/**
 * @description this class is the link between ALMemory's and Redux
 */
export default class ALMemoryBridge {
	static logger = new Logger(debug.ALMemoryBridge, "AlMemoryBridge");
	
	static initBridge = () => {
		const toolbarState = common.toolbarState;
		
		Promise.all([
			
			QiWrapper.listen(toolbarState.ALMemory, this.handleToolbarChange(toolbarState)),
			QiWrapper.listen(generalManagerHRI.currentStep.ALMemory, this.handleChangeCurrentStep()),
			QiWrapper.listen(generalManagerHRI.stepCompleted.ALMemory, this.handleStepCompleted()),
			QiWrapper.listen(generalManagerHRI.stepSkipped.ALMemory, this.handleSetStepSkipped()),
			QiWrapper.listen(generalManagerHRI.timerState.ALMemory, this.handleToggleTimer()),
			QiWrapper.listen(generalManagerHRI.currentScenario.ALMemory, this.handleChangeCurrentScenario()),
			QiWrapper.listen(tabletLM.currentView.ALMemory, this.handleChangeCurrentView())
		
		]).then(() => QiWrapper.raise(tabletLM.tabletOperational.ALMemory, {time: Date.now()}))
			.then(() => {
				setInterval(async () => {
					QiWrapper.raise(common.jsHeartbeat.ALMemory, {time: Date.now()});
					
					dispatch({
						type: comAction.extHeartbeat.type,
						time: {
							lm: JSON.parse(await QiWrapper.getALValue(common.localManagerHeartbeat.ALMemory)).time,
							// gm: JSON.parse(await QiWrapper.getALValue(common.generalManagerHeartbeat.ALMemory)).time
						}
					})
					
					
				}, 1000)
			})
		
		
	};
	
	static handleChangeCurrentView = () => data => {
		
		if (data.view !== undefined || data.data !== undefined) {
			dispatch({
				type: viewAction.changeView.type,
				view: data.view,
				data: data.data
			})
		}
		
		
	};
	
	static handleChangeCurrentScenario = () => (data) => {
		
		dispatch({
			type: scenarioAction.currentScenario.type,
			scenario: data.scenario
		});
		
		dispatch({
			type: timeAction.replaceAllSteps.type,
			steps: data.scenario.steps
		})
		
		
	};
	
	static handleToggleTimer = () => (data) => {
		if ([timeAction.timerState.state.on, timeAction.timerState.state.off].includes(data.state)) {
			dispatch({
				type: timeAction.timerState.type,
				state: data.state
			})
		} else {
			ALMemoryBridge.logger.warn("Unknown mode for timerState");
		}
	};
	
	static handleSetStepSkipped = () => (data) => {
		if (getScenarioSteps().findIndex(step => step.order === data.step.order) >= 0) {
			dispatch({
				type: generalManagerHRI.stepSkipped.reduxKey,
				step: data.step
			})
		} else {
			ALMemoryBridge.logger.warn("SetStepSkipped", "Unknown data.step.order")
		}
	};
	
	static handleStepCompleted = () => (data) => {
		
		if (data) {
			dispatch({
				// type: generalManagerHRI.stepCompleted.reduxKey,
				type: timeAction.stepCompleted.type
			})
		}
	};
	
	static handleChangeCurrentStep = () => (data) => {
		if (getStepById(data.actionId !== undefined)) {
			dispatch({
				type: timeAction.currentStep.type,
				stepId: data.actionId
			});
			
		} else {
			ALMemoryBridge.logger.warn("ChangeCurrentStep", "Unknown data.step.order")
		}
	};
	
	static handleToolbarChange = changeToolbar => data => {
		
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
				ALMemoryBridge.logger.warn("Listen toolbarState", "Unknown data.system")
			}
		} else {
			ALMemoryBridge.logger.warn("Listen toolbarState", "Unknown data.state")
		}
	};
}