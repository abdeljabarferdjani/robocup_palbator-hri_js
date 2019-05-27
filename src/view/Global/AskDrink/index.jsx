import React, {Component} from 'react';
import ConfigWrapper from "../../../controller/ConfigWrapper";
import SpeakableButton from "../reusableComponent/Button/SpeakableButton";
import {comAction} from "../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import './AskDrink.css'
const {drinks : offlineDrinks} = ConfigWrapper.get();


const mapDispatchToProps = (dispatch) => {
	return {
		sendName : (dispatch, name) => {
			dispatch({
				type : comAction.dataJs.type,
				dataType: comAction.dataJs.dataType.drink,
				data : name
			});
			
			console.log("Click on " + name);
		}
	}
};

class AskName extends Component {
	
	
	render() {
		
		const textToShow = this.props.textToShow  || "Hello X, what is your prefered drinks ?";
		
		const names = (this.props.choices.length > 0) ? this.props.choices : offlineDrinks;
		
		return (
			<div id={"AskDrink"}>
				<h2 className={"viewTitle"}>{textToShow}</h2>
				<div className="drinks">
					{names.map(name => <SpeakableButton  onClick={() => this.props.sendName(this.props.dispatch, name)}>{name}</SpeakableButton>)}
				</div>
			</div>
		);
	}
}



export default connect(mapDispatchToProps)(AskName);