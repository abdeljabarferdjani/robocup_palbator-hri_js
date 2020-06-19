import React, {Component} from 'react';
import {comAction} from "../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import ComponentTitle from "../reusableComponent/ComponentTitle";
import {SpeakableButton} from "../reusableComponent/Button/SpeakableButton";
import PropTypes from 'prop-types'
import './MainMenuPalbator.css'
import { viewAction } from '../../../redux/actions/ViewAction';
import {UserComponentPropTypes} from "../../../dev/types";


const mapDispatchToProps = (dispatch) => {
	return {
		sendName: (dispatch, name) => {
			dispatch({
				type: viewAction.getIndexCurrentAction.type
			});
			dispatch({
				type: comAction.dataJs.type,
				dataType: comAction.dataJs.dataType.name,
				data: name
			});
			
		}
	}
};

class MainMenuPalbator extends Component {
	
	static propTypes = {
		...UserComponentPropTypes
	};
	
	
	render() {
		
		const textToShow = this.props.textToShow;
		
		let scenario_list;
		if (this.props.scenario_list && this.props.scenario_list.length > 0) {
			scenario_list = this.props.scenario_list
			console.log("SCENARIO LIST")
			console.log(scenario_list)
		}
		
		return (
			<div>
				<ComponentTitle>{textToShow}</ComponentTitle>
				<div className="scenarios">
					{scenario_list.map(scenario => <SpeakableButton
						onClick={() => this.props.sendName(this.props.dispatch, scenario.name)}>{scenario.id}</SpeakableButton>)}
				</div>
			</div>
		);
	}
}


export default connect(mapDispatchToProps)(MainMenuPalbator);