import React, {Component} from 'react';
import ConfigWrapper from "../../../controller/ConfigWrapper";
import SpeakableButton from "../reusableComponent/Button/SpeakableButton";
import {comAction} from "../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import './AskDrink.css'
import ComponentTitle from "../reusableComponent/ComponentTitle";

const {drinks: offlineDrinks} = ConfigWrapper.get();


const mapDispatchToProps = (dispatch) => {
	return {
		sendName: (dispatch, name) => {
			dispatch({
				type: comAction.dataJs.type,
				dataType: comAction.dataJs.dataType.drink,
				data: name
			});
			
		}
	}
};

class AskName extends Component {
	
	
	render() {
		
		const textToShow = this.props.textToShow || "Hello X, what is your prefered drinks ?";
		
		
		let drinks;
		if (this.props.choices.length > 0) {
			drinks = this.props.choices;
		} else {
			drinks = [];
			offlineDrinks.forEach(obj => drinks.push(obj.name))
		}
		return (
			<div id={"AskDrink"}>
				<ComponentTitle>{textToShow}</ComponentTitle>
				<div className="drinks">
					{drinks.map(drink => <SpeakableButton
						onClick={() => this.props.sendName(this.props.dispatch, drink)}>{drink}</SpeakableButton>)}
				</div>
			</div>
		);
	}
}


export default connect(mapDispatchToProps)(AskName);