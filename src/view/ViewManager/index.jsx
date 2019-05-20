import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {viewAction} from "../../redux/actions/ViewAction";
import Logger from "../../dev/Logger";
import logConfig from '../../config/log'
import ConfigWrapper from "../../controller/ConfigWrapper";

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
		}
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		
		console.debug(nextProps, prevState);
		
		
		if (nextProps.view.currentView !== prevState.currentView) {
			return {
				currentView: nextProps.view.currentView
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
		
		if(this.state.currentView === null) {
			comp = <MainMenu/>
		}
		else
		{
			comp = React.createElement(getClassFromView(this.state.currentView), null, "");
			
		}
		
		
		
		// switch (this.state.currentScenario.name) {
		// 	case scenario.mainMenu.name:
		//
		// 		console.log("Je vois un scénario de MainMenu");
		//
		// 		comp = <MainMenu/>;
		// 		break;
		//
		// 	case scenario.receptionist.name:
		// 		console.log("Je vois un scénario de receptionist");
		//
		// 		switch (this.state.currentView) {
		//
		// 			case receptionist.askAge:
		// 				comp = <AskAge/>;
		// 				break;
		//
		// 			case global.askDrink:
		// 				comp = <AskDrink needConfirm/>;
		// 				break;
		//
		// 			case global.askName:
		// 				comp = <AskName needConform/>;
		// 				break;
		//
		// 			case receptionist.olderOnSofa:
		// 				comp = <OlderOnSofa/>;
		// 				break;
		// 			case receptionist.presentPeople:
		// 				comp = <PresentPeople human1={null} human2={null}/>;
		// 				break;
		//
		// 		}
		// 		//todo cases for receptionist s
		// 		break;
		//
		// 	case scenario.servingDrinks.name:
		// 		console.log("Je vois un scénario de servingDrinks");
		//
		// 		switch (this.state.currentView) {
		// 			case global.idle:
		// 				comp = <div id={"idle"} className={"view"}>None</div>;
		// 				break;
		//
		// 			case servingDrinks.askDrink:
		// 				comp = <AskDrink/>;
		// 				break;
		//
		// 			case servingDrinks.askName:
		// 				comp = <AskName/>;
		//
		// 				break;
		//
		// 			case servingDrinks.findDrinks:
		// 				comp = <FindDrinks/>;
		//
		// 				break;
		//
		// 			case servingDrinks.deliverDrink:
		// 				comp = <DeliverDrinks/>;
		//
		// 				break;
		//
		// 			case servingDrinks.detailDrink:
		// 				comp = <DetailDrinks/>;
		//
		// 				break;
		//
		// 			default:
		// 				break;
		//
		// 		}
		// 		break;
		//
		// 	default:
		// 		console.warn("Unknown Scenario", this.state.currentScenario);
		// 		break;
		// }
		
		
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