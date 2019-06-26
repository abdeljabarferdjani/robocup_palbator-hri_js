import React, {Component} from 'react';
import {connect} from "react-redux";
import {comAction} from "../../../redux/actions/CommunicationAction";
import ComponentTitle from "../reusableComponent/ComponentTitle";
import {SpeakableButton} from "../reusableComponent/Button/SpeakableButton";
import './MainMenu.css'
import PropTypes from 'prop-types'

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
	
	static propTypes = {
		scenarios: PropTypes.arrayOf(String)
	};
	
	render() {
		
		const buttons = [];
		
		(this.props.scenarios || comAction.askToChangeScenario.scenario).forEach(scenario => {
			buttons.push(
				<SpeakableButton
					onClick={() => this.props.askToChangeScenario(scenario['id'])}>
					{scenario['name']}
				</SpeakableButton>
			)
		});
		
		
		return (
			<div className={"MainMenu"}>
				<ComponentTitle>{this.props.textToShow || this.props.children}</ComponentTitle>
				<div>
					{buttons}
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);