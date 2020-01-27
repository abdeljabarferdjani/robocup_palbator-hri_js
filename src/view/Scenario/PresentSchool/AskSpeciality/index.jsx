import React, {Component} from 'react';
import SpeakableButton from "../../../Global/reusableComponent/Button/SpeakableButton";
import {comAction} from "../../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import './AskSpeciality.css'
import {UserComponentPropTypes} from "../../../../dev/types";
import ComponentTitle from "../../../Global/reusableComponent/ComponentTitle";


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

class AskSpeciality extends Component {
	
	static propTypes = {
		...UserComponentPropTypes
	};
	
	
	render() {
		
		const textToShow = this.props.textToShow || "Hello, what is your name ?";
		
		let names;
		if (this.props.names && this.props.names.length > 0) {
			names = this.props.names
		}
		
		return (
			<div>
				<ComponentTitle>{textToShow}</ComponentTitle>
				<div className="names">
					{names.map(name => <SpeakableButton
						onClick={() => this.props.sendName(this.props.dispatch, name.name)}>{name.name}</SpeakableButton>)}
				</div>
			</div>
		);
	}
}


export default connect(mapDispatchToProps)(AskSpeciality);