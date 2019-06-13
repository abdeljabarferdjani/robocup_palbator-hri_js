import React, {Component} from 'react';
import ConfigWrapper from "../../../controller/ConfigWrapper";
import SpeakableButton from "../reusableComponent/Button/SpeakableButton";
import {comAction} from "../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import './AskName.css'
import {UserComponentPropTypes} from "../../../dev/types";
import ComponentTitle from "../reusableComponent/ComponentTitle";

const {names: offlineName} = ConfigWrapper.get();


const mapDispatchToProps = (dispatch) => {
	return {
		sendName: (dispatch, name) => {
			dispatch({
				type: comAction.dataJs.type,
				dataType: comAction.dataJs.dataType.name,
				data: name
			});
			
		}
	}
};

class AskName extends Component {
	
	static propTypes = {
		...UserComponentPropTypes
	};
	
	
	render() {
		
		const textToShow = this.props.textToShow || "Hello, what is your name ?";
		
		let names;
		if (this.props.choices && this.props.choices.length > 0) {
			names = this.props.choices
		} else {
			names = [];
			offlineName.forEach(obj => names.push(obj.name))
		}
		
		return (
			<div>
				<ComponentTitle>{textToShow}</ComponentTitle>
				<div className="names">
					{names.map(name => <SpeakableButton
						onClick={() => this.props.sendName(this.props.dispatch, name)}>{name}</SpeakableButton>)}
				</div>
			</div>
		);
	}
}


export default connect(mapDispatchToProps)(AskName);