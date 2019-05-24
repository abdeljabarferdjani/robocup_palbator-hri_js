import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Logger from "../../dev/Logger";
import logConfig from '../../config/log'

import './index.css'
import {getClassFromView} from "../../controller/ViewStepBridge";
import MainMenu from "../Scenario/MainMenu";


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
		
		console.debug(nextProps, prevState);
		
		
		if (nextProps.view.currentView !== prevState.currentView) {
			return {
				currentView: nextProps.view.currentView,
				currentData: nextProps.view.currentData || {textToShow: "", choices: []}
			}
		}
		if (nextProps.scenario.current !== prevState.currentScenario) {
			return {
				currentScenario: nextProps.scenario.current
			}
		}
		
		
		return null;
	}
	
	render() {
		
		let comp;
		console.log("Here", this.state.currentView, getClassFromView(this.state.currentView));
		
		if (this.state.currentView === null) {
			comp = <MainMenu/>
		} else {
			
			comp = React.createElement(
				getClassFromView(this.state.currentView),
				{
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