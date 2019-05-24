import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toolbarAction} from "../../redux/actions/ToolbarAction";
import {viewAction} from "../../redux/actions/ViewAction";
import {comAction} from "../../redux/actions/CommunicationAction";
import './Debug.css'
import {Button} from 'reactstrap'
import ConfigWrapper from "../../controller/ConfigWrapper";
import QiWrapper from "../../model/QiWrapper";
import DebugServingDrinks from "../Scenario/ServingDrinks/DebugServingDrinks";
import DebugReceptionist from "../Scenario/Receptionist/DebugReceptionist";

const steps = [];

const {apis : {common : apiCommon, tabletLM : apiTabletLM, generalManagerHRI: apiGeneralManagerHRI}, scenario} = ConfigWrapper.get();

function mapStateToProps(state) {
	return {
		toolbar: state.toolbar,
		view: state.view,
		scenario: state.scenario
	};
}


function mapDispatchToProps(dispatch) {
	
	
	return {
		changeView: function (view) {
			
			QiWrapper.raise(apiTabletLM.currentView.ALMemory, {view: view})
			
			
		},
		toggleTimeBoardVisibilty(state) {
			
			const componentVisibility = viewAction.setComponentVisibility;
			state = (state === componentVisibility.state.visible) ? componentVisibility.state.hidden : componentVisibility.state.visible;
			
			
			dispatch({
				type: componentVisibility.type,
				state: state,
				component: componentVisibility.component.timeBoard
			})
		},
		toolbarState: function (tool, state) {
			
			
			QiWrapper.raise(apiCommon.toolbarState.ALMemory, {
				system: tool,
				state: state
			})
			
		},
		jsHeartBeat: function () {
			dispatch({
				type: comAction.jsHeartBeat.type,
			});
		},
		stepCompleted: function () {
			
			
			QiWrapper.raise(apiGeneralManagerHRI.stepCompleted.ALMemory, {step: null})
			
		},
		setStepRecieved: function () {
			dispatch({
				type: comAction.setStepRecieved.type
			})
			
		},
		
		
		timeToggleTimer: function (state) {
			
			QiWrapper.raise(apiGeneralManagerHRI.timerState.ALMemory, {state: state});
			
		},
		
		gotoMainMenu: function () {
			QiWrapper.raise(apiGeneralManagerHRI.currentScenario.ALMemory, {scenario: "mainMenu"});
			
			QiWrapper.raise(apiTabletLM.changeCurrentView.ALMemory, {view: "mainMenu"})
		},
		
		timeStepComplete: function (steps, taskId) {
			
			QiWrapper.raise(apiGeneralManagerHRI.stepCompleted.ALMemory, {step: null})
		},
		
		
		timeStepSkipped: function (stepId) {
			
			
			QiWrapper.raise(apiGeneralManagerHRI.stepSkipped.ALMemory, {
				stepId: stepId
			})
			
		},
		
		timeStepChangeCurrent: function (stepId) {
			
			QiWrapper.raise(apiGeneralManagerHRI.currentStep.ALMemory, {
				stepId: stepId
			});
		},
		
	}
}

class Debug extends Component {
	
	static getDerivedStateFromProps(nextProps, prevState) {
		if(prevState.currentScenario !== nextProps.currentScenario) {
			return {
				currentScenario : nextProps.currentScenario
			}
		}
		return null;
	}
	
	constructor(props) {
		super(props);
		this.state = {
			currentStep: null,
			currentScenario : this.props.scenario.current
		}
	}
	
	
	render() {
		
		let className = "Debug";
		
		
		let scenarioDebug = null;
		
		switch (this.props.scenario.current.name) {
			case scenario.mainMenu.name:
				steps.length = 0;
				steps.push(...scenario.mainMenu.steps);
				break;
			
			
			case scenario.servingDrinks.name:
				scenarioDebug = <DebugServingDrinks steps={scenario.servingDrinks.steps}/>;
				steps.length = 0;
				steps.push(...scenario.servingDrinks.steps);
				break;
			
			
			case scenario.receptionist.name:
				scenarioDebug =
					<DebugReceptionist steps={scenario.receptionist.steps} changeView={this.props.changeView}/>;
				steps.length = 0;
				steps.push(...scenario.receptionist.steps);
				break;
			default:
				break;
			
		}
		
		
		const toolbarState = toolbarAction.toolbarState.state;
		
		
		const stepOptions = [];
		
		console.log("I m here, ", steps);
		
		steps.forEach((step) => {
			stepOptions.push(
				<option value={step.id}>{step.name}</option>
			)
		});
		
		return (
			<div className={className}>
				<h1>Debug</h1>
				
				<div id="redux">
					<h2>REDUX</h2>
					
					<div id="changeView">
						<h3>View</h3>
						<h4>changeView</h4>
						
						<h4>Component visibility</h4>
						
						<Button
							onClick={() => this.props.toggleTimeBoardVisibilty(this.props.view.componentVisibility.timeBoard)}
							color={"info"}>Toggle timeBoard Visibility</Button>
					</div>
					
					<div id="toolbar">
						<h3>Toolbar</h3>
						<Button color={"info"}
						        onClick={() => this.props.toolbarState(toolbarAction.toolbarState.system.canMove,
							        this.props.toolbar.canMove === toolbarState.ok ? toolbarState.error : toolbarState.ok)}>
							Can Move
						</Button>
						<Button color={"info"}
						        onClick={() => this.props.toolbarState(toolbarAction.toolbarState.system.micro,
							        this.props.toolbar.micro === toolbarState.ok ? toolbarState.error : toolbarState.ok)}>
							Micro
						</Button>
						<Button color={"info"}
						        onClick={() => this.props.toolbarState(toolbarAction.toolbarState.system.internet,
							        this.props.toolbar.internet === toolbarState.ok ? toolbarState.error : toolbarState.ok)}>
							Internet
						</Button>
						<Button color={"info"}
						        onClick={() => this.props.toolbarState(toolbarAction.toolbarState.system.pcConnection,
							        this.props.toolbar.pcConnection === toolbarState.ok ? toolbarState.error : toolbarState.ok)}>
							Pc Connection
						</Button>
					</div>
					<div id="communication">
						<h3>Communication</h3>
						<Button color={"info"} onClick={() => this.props.jsHeartBeat()}>Heartbeats</Button>
						
						<div id="taskRecieved">
							<Button color={"info"} onClick={() => {
								this.props.setStepRecieved()
							}}>Step recieved
							</Button>
						</div>
					</div>
					
					
					<div id="time">
						<h3>Time</h3>
						
						
						<Button color={"danger"}
						        onClick={() => this.props.timeToggleTimer(apiGeneralManagerHRI.timerState.state.on)}>Start
							timer</Button>
						<Button color={"danger"}
						        onClick={() => this.props.timeToggleTimer(apiGeneralManagerHRI.timerState.state.off)}>Stop
							timer</Button>
					
					</div>
				</div>
				
				
				<div id="steps">
					<select onChange={evt => {
						evt.persist();
						this.setState(prev => {
							return {
								...prev,
								currentStep: Number.parseInt(evt.target.value)
							}
						})
					}}>{stepOptions}</select>
					<Button color={"info"} onClick={() => this.props.timeStepSkipped(this.state.currentStep)}>Pass
						step</Button>
					<Button color={"info"} onClick={() => this.props.timeStepComplete(this.state.currentStep)}>Complete
						Step</Button>
					<Button color={"info"}
					        onClick={() => this.props.timeStepChangeCurrent(this.state.currentStep)}>Change
						current
						step
					</Button>
				</div>
				
				
				<Button color={"info"} onClick={this.props.gotoMainMenu}>Go to Main Menu</Button>
				
				<h2>Current Scenario</h2>
				{scenarioDebug}
			
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Debug);