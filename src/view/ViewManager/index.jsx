import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {viewAction} from "../../redux/actions/ViewAction";
import Logger from "../../dev/Logger";
import logConfig from '../../config/log'
import ConfigWrapper from "../../controller/ConfigWrapper";
import MainMenu from "../Scenario/MainMenu";
import AskDrink from "../Global/AskDrink";
import DeliverDrinks from "../Scenario/ServingDrinks/DeliverDrink";
import DetailDrinks from "../Scenario/ServingDrinks/DetailDrink";
import AskName from "../Global/AskName";
import FindDrinks from "../Scenario/ServingDrinks/FindDrink";

import './index.css'
import PresentPeople from "../Scenario/Receptionist/PresentPeople";
const {scenario} = ConfigWrapper.get();

function mapStateToProps(state) {
	return {
		view: state.view,
		scenario : state.scenario
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
			currentScenario : this.props.scenario.current,
		}
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		
		
		if (nextProps.view.currentView !== prevState.currentView) {
			return {
				view: nextProps.view.currentView
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
		
		const {receptionist, global, servingDrinks} = viewAction.changeView.views;
		
		switch (this.state.currentScenario.name) {
			case scenario.mainMenu.name:
				
				console.log("Je vois un scénario de MainMenu");
				
				comp = <MainMenu/>;
				break;
			
			case scenario.receptionist.name:
				console.log("Je vois un scénario de receptionist");
				
				switch (this.state.currentView) {

					case receptionist.askAge:
						break;
						
					case receptionist.olderOnSofa:
						break;
					case receptionist.presentPeople:
						comp = <PresentPeople/>;
						break;

				}
				//todo cases for receptionist s
				break;
			
			case scenario.servingDrinks.name:
				console.log("Je vois un scénario de servingDrinks");
				
				switch (this.state.currentView) {
					case global.idle:
						comp = <div id={"idle"} className={"view"}>None</div>;
						break;
					
					case servingDrinks.askDrink:
						comp = <AskDrink/>;
						break;
					
					case servingDrinks.askName:
						comp = <AskName/>;
						
						break;
					
					case servingDrinks.findDrinks:
						comp = <FindDrinks/>;
						
						break;
					
					case servingDrinks.deliverDrink:
						comp = <DeliverDrinks/>;
						
						break;
					
					case servingDrinks.detailDrink:
						comp = <DetailDrinks/>;
						
						break;
					
					default:
						break;
					
				}
				break;
			
			default:
				console.warn("Unknown Scenario", this.state.currentScenario);
				break;
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