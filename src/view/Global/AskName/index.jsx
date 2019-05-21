import React, {Component} from 'react';
import ConfigWrapper from "../../../controller/ConfigWrapper";
import SpeakableButton from "../reusableComponent/Button/SpeakableButton";
import {comAction} from "../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import './AskName.css'
const {names : offlineName} = ConfigWrapper.get();


const mapDispatchToProps = (dispatch) => {
	return {
		sendAge : (dispatch, name) => {
			dispatch({
				type : comAction.sendData.type,
				dataType: comAction.sendData.dataType.name,
				data : name
			});
			
			console.log("Click on " + name);
		}
	}
};

 class AskName extends Component {
	
	
	render() {
		
		const textToShow = this.props.textToShow || "Hello, what is your name ?";
		
		const names = (this.props.choice.length > 0) ? this.props.choice : offlineName;
		
		return (
			<div>
				<h2 className={"viewTitle"}>{textToShow}</h2>
				<div className="names">
					{names.map(name => <SpeakableButton  onClick={() => this.props.sendAge(this.props.dispatch, name)}>{name}</SpeakableButton>)}
				</div>
			</div>
		);
	}
}



export default connect(mapDispatchToProps)(AskName);