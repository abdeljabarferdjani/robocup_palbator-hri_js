import React, {Component} from 'react';
import ConfigWrapper from "../../../controller/ConfigWrapper";
import SpeakableButton from "../reusableComponent/Button/SpeakableButton";
import {comAction} from "../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const {names} = ConfigWrapper.get();


const mapDispatchToProps = (dispatch) => {
	return {
		sendName : (name) => {
			dispatch({
				type : comAction.sendData.type,
				dataType: comAction.sendData.dataType.name,
				data : name
			})
		}
	}
};

 class AskName extends Component {
	
	static propTypes = {
		confirm : PropTypes.bool.isRequired
	};
	
	static defaultProps = {
		confirm : true
	};
	
	render() {
		return (
			<div>
				<h2>What is your name ?</h2>
				<div className="names">
					{names.map(name => <SpeakableButton onClick={() => this.props.sendName(name)}>{name}</SpeakableButton>)}
				</div>
			</div>
		);
	}
}



export default connect(mapDispatchToProps)(AskName);