import React, {Component} from 'react';
import ViewManager from "./view/ViewManager";
import TimeBoard from "./view/Global/TimeBoard";
import './App.css';
// import './AppDark.css';
import Toolbar from "./view/Global/Toolbar/Toolbar";
import logConfig from './config/log'
import Logger from "./dev/Logger";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
	return {
		scenario: state.scenario
	}
};


class App extends Component {
	
	static propTypes = {};
	
	static logger = new Logger(logConfig.App, "App");
	
	
	state = {
		scenario: this.props.scenario.current
	};
	
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.scenario.current !== prevState.scenario) {
			return {
				scenario: nextProps.scenario.current
			}
		}
		
		return null;
	}
	
	componentDidMount() {
		document.ontouchmove = (e) => {
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
			<div className={"App"}>
				<div className="component leftPart">
					<TimeBoard/>
				</div>
				
				<div id="rightPart">
					
					<div id="header">
						
						<div className="component scenarioTitle">
							<h1>{scenarioName}</h1>
						
						</div>
						
						<div className="component">
							<Toolbar/>
						</div>
					</div>
					
					<div className="component">
						<ViewManager/>
					</div>
				
				
				</div>
			
			
			</div>
		);
	}
}


export default connect(mapStateToProps)(App);
