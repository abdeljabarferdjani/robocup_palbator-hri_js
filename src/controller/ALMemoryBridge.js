import {dispatch, store} from '../redux/Store'
import debug from '../config/log';
import {viewAction} from "../redux/actions/ViewAction";
import ConfigWrapper from "./ConfigWrapper";
import QiWrapper from "../model/QiWrapper";
import {timeAction} from "../redux/actions/TimeAction";
import Logger from "../dev/Logger";
import {toolbarAction} from "../redux/actions/ToolbarAction";
import {scenarioAction} from "../redux/actions/ScenarioAction";


const {ALMemoryEvent, scenario} = ConfigWrapper.get();

/**
 *
 * @return {[Object]}
 */
const getScenarioSteps = () => {
	
	return store.getState().scenario.current.steps;
	
};


/**
 * @description this class is the link between ALMemory's and Redux
 */
export default class ALMemoryBridge {
	static logger = new Logger(debug.ALMemoryBridge, "AlMemoryBridge");
	
	static initBridge = () => {
		const changeToolbar = ALMemoryEvent.changeToolbar;
		
		Promise.all([
			
			QiWrapper.listen(changeToolbar.ALMemory, data => {
				
				const possibleState = [changeToolbar.state.ok, changeToolbar.state.error];
				
				if (possibleState.includes(data.state)) {
					const possibleSystems = [];
					const systemKeys = Object.keys(changeToolbar.system);
					systemKeys.forEach(key => {
						possibleSystems.push(ALMemoryEvent.changeToolbar.system[key])
					});
					
					if (possibleSystems.includes(data.system)) {
						dispatch({
							type: toolbarAction.changeToolbar.type,
							system: data.system,
							state: data.state
						})
					} else {
						ALMemoryBridge.logger.warn("Listen changeToolbar", "Unknown data.system")
					}
				} else {
					ALMemoryBridge.logger.warn("Listen changeToolbar", "Unknown data.state")
				}
			}),
			
			
			QiWrapper.listen(ALMemoryEvent.changeCurrentStep.ALMemory, (data) => {
				if (getScenarioSteps().findIndex(step => step.order === data.step.order) >= 0) {
					dispatch({
						type: timeAction.changeCurrentStep.type,
						step: data.step
					});
					
				} else {
					ALMemoryBridge.logger.warn("ChangeCurrentStep", "Unknown data.step.order")
				}
			}),
			
			
			QiWrapper.listen(ALMemoryEvent.setStepCompleted.ALMemory, (data) => {
				
				if (data && data.step === null) {
					dispatch({
						type: ALMemoryEvent.setStepCompleted.reduxKey,
					})
				}
			}),
			
			QiWrapper.listen(ALMemoryEvent.setStepSkipped.ALMemory, (data) => {
				if (getScenarioSteps().findIndex(step => step.order === data.step.order) >= 0) {
					dispatch({
						type: ALMemoryEvent.setStepSkipped.reduxKey,
						step: data.step
					})
				} else {
					ALMemoryBridge.logger.warn("SetStepSkipped", "Unknown data.step.order")
				}
			}),
			
			
			QiWrapper.listen(ALMemoryEvent.toggleTimer.ALMemory, (data) => {
				
				
				if ([timeAction.toggleTimer.mode.start, timeAction.toggleTimer.mode.stop].includes(data.mode)) {
					dispatch({
						type: timeAction.toggleTimer.type,
						mode: data.mode
					})
				} else {
					ALMemoryBridge.logger.warn("Unknown mode for toggleTimer");
				}
			}),
			
			
			QiWrapper.listen(ALMemoryEvent.changeCurrentScenario.ALMemory, (data) => {
				
				
				
				if (Object.keys(scenario).includes(data.scenario)) {
					const newSenar = scenario[data.scenario];
					
					dispatch({
						type: scenarioAction.changeCurrentScenario.type,
						scenario: newSenar
					});
					
					dispatch({
						type: timeAction.replaceAllSteps.type,
						steps: newSenar.steps
					})
				}
			
				
			}),
			
			
			QiWrapper.listen(ALMemoryEvent.changeCurrentView.ALMemory, data => {
				
				if (data.view !== undefined || data.data !== undefined) {
					dispatch({
						type: viewAction.changeView.type,
						view: data.view,
						data: data.data
					})
				}
				
				
			})
		
		]).then(() => QiWrapper.raise(ALMemoryEvent.sendTabletOperational.ALMemory, {time: Date.now()}))
			.then(() => {
				setInterval(() => {
					QiWrapper.raise(ALMemoryEvent.sendHeartbeat.ALMemory, {time: Date.now()});
				}, 1000)
			})
		
		
	}
	
}