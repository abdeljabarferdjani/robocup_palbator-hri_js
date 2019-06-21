import React, {Component} from 'react';
import Wait from "../../../Global/Wait";
import {SpeakableButton} from "../../../Global/reusableComponent/Button/SpeakableButton";
import {comAction} from "../../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import ComponentTitle from "../../../Global/reusableComponent/ComponentTitle";
import PropTypes from 'prop-types'

const mapDispatchToProps = (dispatch) => {
	return {
		humanIsHere: () => {
			dispatch({
				type: comAction.dataJs.type,
				data: {}
			})
		}
	}
};

const mapStateToProps = (state) => {
	return {}
};


class CallHuman extends Component {
	
	static propTypes = {
		time: PropTypes.number.isRequired,
		textToShow: PropTypes.string,
		humanIsHere: PropTypes.func.isRequired
	};
	
	render() {
		let textToShow = this.props.textToShow || "[PLACEHOLDER] I'm waiting for a human";
		return (
			<div className={"CallHuman"}>
				<ComponentTitle>{textToShow}</ComponentTitle>
				<SpeakableButton
					onClick={this.props.humanIsHere}>{"I'm here"}
				</SpeakableButton>
				<Wait time={60}/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CallHuman);