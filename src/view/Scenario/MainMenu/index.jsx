import React, {Component} from 'react';
import {connect} from "react-redux";
import ConfigWrapper from "../../../controller/ConfigWrapper";
import QiWrapper from "../../../model/QiWrapper";

const {apis: {generalManagerHRI}} = ConfigWrapper.get();

const mapDispatchToProps = (dispatch) => {
	return {
		currentScenario: (scenario) => {
			
			
			QiWrapper.raise(generalManagerHRI.currentScenario.ALMemory, {scenario: scenario})
			//
			// dispatch({
			// 	type: scenarioAction.currentScenario.type,
			// 	scenario: scenario
			// })
			//
			// dispatch({
			// 	type : timeAction.replaceAllSteps.type,
			// 	steps : scenario.steps
			// })
			
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
		
		
		return (
			<div>
				<button className={"btn btn-info"}
				        onClick={() => this.props.currentScenario("servingDrinks")}
				>
					Serving Drinks
				</button>
				<button className={"btn btn-info"}
				        onClick={() => this.props.currentScenario("receptionist")}
				>
					Receptionist
				</button>
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