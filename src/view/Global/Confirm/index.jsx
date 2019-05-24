import React, {Component} from 'react';
import './Confirm.css'
import AutoValidationButton from "../reusableComponent/Button/AutoValidationButton";
import {SpeakableButton} from "../reusableComponent/Button/SpeakableButton";
import {comAction} from "../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import {UserComponentPropTypes} from "../../../dev/types";

const mapDispatchToProps = (dispatch) => {
	return {
		handleNoClick: (dispatch) => {
			dispatch({
				type: comAction.sendData.type,
				dataType: comAction.sendData.dataType.confirm,
				data: false
			});
			
			console.log("Dispatch NO")
			
		},
		handleYesClick: (dispatch) => {
			dispatch({
				type: comAction.sendData.type,
				dataType: comAction.sendData.dataType.confirm,
				data: true
			});
			console.log("Dispatch Yes")
			
		}
	}
};

class Confirm extends Component {
	
	
	static propTypes = {
		...UserComponentPropTypes,
	};
	
	render() {
		
		
		const textToShow = this.props.textToShow || "Are you sure that you want X?";
		let img = null;
		if (this.props.imagePath !== undefined) {
			
			img = <img src={process.env.PUBLIC_URL + "/" + this.props.imagePath} alt=""/>
		}
		
		
		return (
			<div>
				<h2 className="viewTitle">{textToShow}</h2>
				
				{img}
				
				<div className={"choices"}>
					<SpeakableButton onClick={() => this.props.handleNoClick(this.props.dispatch)}
					                 color={"no"}>No</SpeakableButton>
					<AutoValidationButton onClick={() => this.props.handleYesClick(this.props.dispatch)} color={"ok"}
					                      timeout={10}>Yes</AutoValidationButton>
				</div>
			</div>
		);
	}
}

export default connect(mapDispatchToProps)(Confirm);