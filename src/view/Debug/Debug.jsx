import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toolbarAction} from "../../redux/actions/ToolbarAction";
import {viewAction} from "../../redux/actions/ViewAction";
import {comAction} from "../../redux/actions/CommunicationAction";
import './Debug.css'
import ConfigWrapper from "../../controller/ConfigWrapper";
import QiWrapper from "../../model/QiWrapper";
import ViewSimulator from "./ViewSimulator";
import ComponentTitle from "../Global/reusableComponent/ComponentTitle";


const {apis: {common: apiCommon, tabletLM: apiTabletLM, generalManagerHRI: apiGeneralManagerHRI}, drinks, locations, names, videos} = ConfigWrapper.get();

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
		jsHeartbeat: function () {
			dispatch({
				type: comAction.jsHeartbeat.type,
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
		
		timeStepComplete: function () {
			
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
	
	constructor(props) {
		super(props);
		this.state = {
			currentStep: null,
			currentScenario: this.props.scenario.current,
			imagePath: "",
			videoPath: ""
		}
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.currentScenario !== nextProps.currentScenario) {
			return {
				currentScenario: nextProps.currentScenario
			}
		}
		return null;
	}
	
	handleImageClick = () => {
	
	};
	
	
	handleVideoClick = () => {
	
	};
	
	render() {
		
		let className = "Debug";
		
		let images = [];
		images.push(drinks, locations);
		let imagesOptions = [];
		images.forEach(img => {
			if (img !== undefined) {
				imagesOptions.push(<option
					value={img['pathOnTablet']}>{img['obj']}</option>)
			}
		});
		
		let videosOptions = [];
		new Array(videos).forEach(video => {
			if (video !== undefined) {
				videosOptions.push(<option
					value={video['pathOnTablet']}>{video['obj']}</option>)
			}
		});
		
		
		let scenarioDebug = null;
		
		const toolbarState = toolbarAction.toolbarState.state;
		
		return (
			<div className={className}>
				<ComponentTitle>Debug</ComponentTitle>
				
				<div id="redux">
					<h2>REDUX</h2>
					
					<div id="changeView">
						<h3>View</h3>
						<ViewSimulator/>
						<h4>changeView</h4>
						
						<h4>Component visibility</h4>
						
						<button
							onClick={() => this.props.toggleTimeBoardVisibilty(this.props.view.componentVisibility.timeBoard)}
							className={"btn btn-info"}>Toggle timeBoard
							Visibility
						</button>
					</div>
					
					<div id="toolbar">
						<h3>Toolbar</h3>
						<button className={"btn btn-info"}
						        onClick={() => this.props.toolbarState(toolbarAction.toolbarState.system.canMove,
							        this.props.toolbar.canMove === toolbarState.ok ? toolbarState.error : toolbarState.ok)}>
							Can Move
						</button>
						<button className={"btn btn-info"}
						        onClick={() => this.props.toolbarState(toolbarAction.toolbarState.system.micro,
							        this.props.toolbar.micro === toolbarState.ok ? toolbarState.error : toolbarState.ok)}>
							Micro
						</button>
						<button className={"btn btn-info"}
						        onClick={() => this.props.toolbarState(toolbarAction.toolbarState.system.internet,
							        this.props.toolbar.internet === toolbarState.ok ? toolbarState.error : toolbarState.ok)}>
							Internet
						</button>
						<button className={"btn btn-info"}
						        onClick={() => this.props.toolbarState(toolbarAction.toolbarState.system.pcConnection,
							        this.props.toolbar.pcConnection === toolbarState.ok ? toolbarState.error : toolbarState.ok)}>
							Pc Connection
						</button>
					</div>
					<div id="communication">
						<h3>Communication</h3>
						<button className={"btn btn-info"}
						        onClick={() => this.props.jsHeartbeat()}>Heartbeats
						</button>
						
						<div id="taskRecieved">
							<button className={"btn btn-info"} onClick={() => {
								this.props.setStepRecieved()
							}}>Step recieved
							</button>
						</div>
					</div>
					
					
					<div id="time">
						<h3>Time</h3>
						
						
						<button className={"btn btn-danger"}
						        onClick={() => this.props.timeToggleTimer(apiGeneralManagerHRI.timerState.state.on)}>Start
							timer
						</button>
						<button className={"btn btn-danger"}
						        onClick={() => this.props.timeToggleTimer(apiGeneralManagerHRI.timerState.state.off)}>Stop
							timer
						</button>
					
					</div>
				</div>
				
				
				<div id="steps">
					
					<button className={"btn btn-info"}
					        onClick={() => this.props.timeStepSkipped(this.state.currentStep)}>Pass
						step
					</button>
					<button className={"btn btn-info"}
					        onClick={() => this.props.timeStepComplete()}>Complete
						Step
					</button>
					<button className={"btn btn-info"}
					        onClick={() => this.props.timeStepChangeCurrent(this.state.currentStep)}>Change
						current
						step
					</button>
				</div>
				
				
				<button className={"btn btn-info"}
				        onClick={this.props.gotoMainMenu}>Go to Main Menu
				</button>
				<div className="Video">
					<h3>Video</h3>
					<select name="" id=""
					        onChange={this.handleVideoInputChange}>
						{videosOptions}
					</select>
					
					<video src={this.state.videoPath}/>
				
				</div>
				
				<div className="Image">
					<h3>Image</h3>
					<select name="" id=""
					        onChange={this.handleVideoInputChange}>
						{imagesOptions}
					</select>
					<img src={this.state.imagePath} alt=""/>
				</div>
			
			</div>
		);
	}
	
	handleVideoInputChange = (evt) => {
		
		console.log(evt.target.value);
		
		this.setState(prev => {
			return {
				...prev,
				
			}
		})
	};
	
	handleImageInputChange = (evt) => {
	
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Debug);