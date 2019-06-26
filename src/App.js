import React, {Component} from 'react';
import ViewManager from "./view/ViewManager";
import TimeBoard from "./view/Global/TimeBoard";
import './App.css';
// import './AppDark.css';
import Toolbar from "./view/Global/Toolbar/Toolbar";
import logConfig from './config/log'
import Logger from "./dev/Logger";
import {connect} from "react-redux";
import Logo from "./view/Global/Logo";


const mapStateToProps = (state) => {
	return {
		scenario: state.scenario
	}
};


class App extends Component {
	
	static propTypes = {};
	
	static logger = new Logger(logConfig.App, "App");
	
	nbClickForDebug = 0;
	state = {
		scenario: this.props.scenario.current
	};
	askForDebug = () => {
		this.nbClickForDebug++;
		if(this.nbClickForDebug > 10) {
			// Allow the scroll on tablet
			document.querySelector("div.scenarioTitle").style.color = "#F00";
			document.ontouchmove = function() {}
		}
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		// Check if it's a new scenario 
		if (nextProps.scenario.current !== prevState.scenario) {
			return {
				scenario: nextProps.scenario.current
			}
		}
		
		return null;
	}
	
	componentDidMount() {
		document.ontouchmove = (e) => {
			// prevent scroll on tablet
			e.preventDefault()
		}
	}
	
	render() {
		
		let scenarioName;
		
		if (this.state.scenario !== undefined) {
			scenarioName = this.state.scenario.name
		} else {
			scenarioName = "No scenario loaded"
		}
		
		return (
			<div className={"App"} >
				<div className="component leftPart">
					{/*List of steps with remaning time for each*/}
					<TimeBoard/>
				</div>
				
				<div id="rightPart">
					
					<div id="header">
						
						<div className="component scenarioTitle" onClick={this.askForDebug}>
							{/*On top left, the name of the scenario (receptionist, take out the garbage, etc.)*/}
							<h1>{scenarioName}</h1>
						
						</div>
						
						<div className="component">
							{/*On top center, the differents problem that affect Pepper (voice mute, ROS dead, etc.)*/}
							<Toolbar/>
						</div>
						<div className={"component logo"}>
							{/*The Logos of organisations that form LyonTech*/}
							<Logo/>
						</div>
					</div>
					
					<div className="component">
						{/*Component that create the view in function of LM orders*/}
						<ViewManager/>
					</div>
				
				
				</div>
			
			
			</div>
		);
	}
}


export default connect(mapStateToProps)(App);
