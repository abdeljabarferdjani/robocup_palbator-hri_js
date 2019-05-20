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
import {timeAction} from "../../redux/actions/TimeAction";

const steps = [];

const {ALMemoryEvent, scenario} = ConfigWrapper.get();

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
			dispatch({
				type: viewAction.changeView.type,
				view: view,
			})
			
			
			QiWrapper.raise(ALMemoryEvent.changeCurrentView.ALMemory, {view : view})
			
			// todo pass by ALMemory
			
			
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
		changeToolbar: function (tool, state) {
			
			
			QiWrapper.raise(ALMemoryEvent.changeToolbar.ALMemory, {
				system: tool,
				state: state
			})
			
		},
		heartbeats: function () {
			dispatch({
				type: comAction.heartbeats.type,
			});
		},
		setStepCompleted: function () {
			
			
			QiWrapper.raise(ALMemoryEvent.setStepCompleted.ALMemory, {step: null})
			
		},
		setStepRecieved: function () {
			dispatch({
				type: comAction.setStepRecieved.type
			})
			
		},
		
		
		timeToggleTimer: function (mode) {

			QiWrapper.raise(ALMemoryEvent.toggleTimer.ALMemory, {mode: mode});
			
		},
		
		gotoMainMenu : function () {
			// TODO fix dont change step /  current middle app
			QiWrapper.raise(ALMemoryEvent.changeCurrentScenario.ALMemory, {scenario: scenario.mainMenu})
		}
		
		
	}
}

class Debug extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			currentStep: null
		}
	}
	
	
	render() {
		
		let className = "Debug";
		
		
		
		
		let scenarioDebug = null;
		
		const scenario = ConfigWrapper.get().scenario;
		switch (this.props.scenario.current.name) {
			case scenario.mainMenu.name:
				steps.length = 0;
				steps.push(scenario.mainMenu.steps);
				break;
			
			
			case scenario.servingDrinks.name:
				scenarioDebug = <DebugServingDrinks steps={scenario.servingDrinks.steps}/>;
				steps.length = 0;
				steps.push(scenario.servingDrinks.steps);
				break;
			
			
			case scenario.receptionist.name:
				scenarioDebug = <DebugReceptionist steps={scenario.receptionist.steps} changeView={this.props.changeView}/>;
				steps.length = 0;
				steps.push(scenario.receptionist.steps);
				break;
			
		}
		
		
		const toolbarState = toolbarAction.changeToolbar.state;
		return (
			<div className={className}>
				<h1>Debug</h1>
				
				<div id="redux">
					<h2>REDUX</h2>
					
					<div id="toolbar">
						<h3>Toolbar</h3>
						<Button color={"info"}
						        onClick={() => this.props.changeToolbar(toolbarAction.changeToolbar.payload.canMove,
							        this.props.toolbar.canMove === toolbarState.ok ? toolbarState.error : toolbarState.ok)}>
							Can Move
						</Button>
						<Button color={"info"}
						        onClick={() => this.props.changeToolbar(toolbarAction.changeToolbar.payload.micro,
							        this.props.toolbar.micro === toolbarState.ok ? toolbarState.error : toolbarState.ok)}>
							Micro
						</Button>
						<Button color={"info"}
						        onClick={() => this.props.changeToolbar(toolbarAction.changeToolbar.payload.internet,
							        this.props.toolbar.internet === toolbarState.ok ? toolbarState.error : toolbarState.ok)}>
							Internet
						</Button>
						<Button color={"info"}
						        onClick={() => this.props.changeToolbar(toolbarAction.changeToolbar.payload.pcConnection,
							        this.props.toolbar.pcConnection === toolbarState.ok ? toolbarState.error : toolbarState.ok)}>
							Pc Connection
						</Button>
					</div>
					<div id="communication">
						<h3>Communication</h3>
						<Button color={"info"} onClick={() => this.props.heartbeats()}>Heartbeats</Button>
						
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
						        onClick={() => this.props.timeToggleTimer(ALMemoryEvent.toggleTimer.mode.start)}>Start
							timer</Button>
						<Button color={"danger"}
						        onClick={() => this.props.timeToggleTimer(ALMemoryEvent.toggleTimer.mode.stop)}>Stop
							timer</Button>
					
					</div>
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