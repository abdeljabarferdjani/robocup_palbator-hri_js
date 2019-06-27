import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Logger from "../../dev/Logger";
import logConfig from '../../config/log'

import './index.css'
import {getClassFromView} from "../../controller/ViewStepBridge";
import MainMenu from "../Global/MainMenu";


function mapStateToProps(state) {
	return {
		view: state.view,
		scenario: state.scenario
	};
}

class ViewManager extends Component {
	
	static logger = new Logger(logConfig.ViewManager, "ViewManager");
	
	static propTypes = {
		scenario: PropTypes.object.isRequired, // redux
		className: PropTypes.string
	};
	
	constructor(props) {
		super(props);
		
		this.state = {
			currentView: this.props.view.currentView,
			currentScenario: this.props.scenario.current,
			currentData: this.props.view.currentData
		}
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		
		// Checks if we need to change the current view (if new view or data (nextprops) are differents from the previous one (prevState))
		if (nextProps.view.currentView !== prevState.currentView || nextProps.view.currentData !== prevState.currentData) {
			return {
				currentView: nextProps.view.currentView,
				currentData: nextProps.view.currentData
			}
		}
		// Check if it's a new scenario
		if (nextProps.scenario.current !== prevState.currentScenario) {
			return {
				currentScenario: nextProps.scenario.current
			}
		}
		
		return null;
	}
	
	componentDidCatch(error, errorInfo) {
		console.error("Error in ViewManager", error, errorInfo)
	}
	
	render() {
		
		let comp;
		// Default view
		if (this.state.currentView === null) {
			comp = <MainMenu>Please click on the scenario</MainMenu>
		} else {
			// Create the center headerview in function of view in state and send their props
			comp = React.createElement(getClassFromView(this.state.currentView), {
					...this.state.currentData
				}
			)
		}
		
		ViewManager.logger.log("render", comp);
		
		let className = "ViewManager";
		className += (this.props.className) ? this.props.className : "";
		
		return (
			<div className={className}>
				{comp}
			</div>
		
		);
	}
}

export default connect(
	mapStateToProps,
)(ViewManager);