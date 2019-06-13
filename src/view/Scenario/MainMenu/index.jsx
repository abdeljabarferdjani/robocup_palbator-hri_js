import React, {Component} from 'react';
import {connect} from "react-redux";
import ConfigWrapper from "../../../controller/ConfigWrapper";
import {comAction} from "../../../redux/actions/CommunicationAction";
import ComponentTitle from "../../Global/reusableComponent/ComponentTitle";

const {apis: {generalManagerHRI}} = ConfigWrapper.get();

const mapDispatchToProps = (dispatch) => {
	return {
		
		askToChangeScenario: scenarioName => {
			dispatch({
				type: comAction.askToChangeScenario.type,
				scenario: scenarioName
			})
		}
		
	}
};

const mapStateToProps = (state) => {
	return {
		scenario: state.scenario
	};
};

class MainMenu extends Component {
	
	
	render() {
		
		const buttons = [];
		
		comAction.askToChangeScenario.scenario.forEach(scenario => {
			buttons.push(
				<button className={"btn btn-info"}
				        onClick={() => this.props.askToChangeScenario(scenario)}>
					{scenario}
				</button>
			)
		});
		
		
		return (
			<div>
				<ComponentTitle>{this.props.textToShow}</ComponentTitle>
				{buttons}
				{/*<Button color={"info"}*/}
				{/*        onClick={() => this.props.currentScenario(scenario.mainMenu)}*/}
				{/*        size={"lg"}>*/}
				{/*	Main Menu*/}
				{/*</Button>*/}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);