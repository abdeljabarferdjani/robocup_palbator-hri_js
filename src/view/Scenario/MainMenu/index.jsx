import React, {Component} from 'react';
import Button from "reactstrap/es/Button";
import {connect} from "react-redux";
import ConfigWrapper from "../../../controller/ConfigWrapper";
import QiWrapper from "../../../model/QiWrapper";

const {scenario, ALMemoryEvent} = ConfigWrapper.get();

const mapDispatchToProps = (dispatch) => {
	return {
		changeCurrentScenario: (scenario) => {
			
			
			QiWrapper.raise(ALMemoryEvent.changeCurrentScenario.ALMemory, {scenario: scenario})
			//
			// dispatch({
			// 	type: scenarioAction.changeCurrentScenario.type,
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
				<Button color={"info"}
				        onClick={() => this.props.changeCurrentScenario("servingDrinks")}
				        size={"lg"}>
					Serving Drinks
				</Button>
				<Button color={"info"}
				        onClick={() => this.props.changeCurrentScenario("receptionist")}
				        size={"lg"}>
					Receptionist
				</Button>
				{/*<Button color={"info"}*/}
				{/*        onClick={() => this.props.changeCurrentScenario(scenario.mainMenu)}*/}
				{/*        size={"lg"}>*/}
				{/*	Main Menu*/}
				{/*</Button>*/}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);