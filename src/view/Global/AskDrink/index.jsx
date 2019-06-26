import React, {Component} from 'react';
import SpeakableButton from "../reusableComponent/Button/SpeakableButton";
import {comAction} from "../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import './AskDrink.css'
import ComponentTitle from "../reusableComponent/ComponentTitle";
import Drink from "../reusableComponent/Drink/Drink";
import PropTypes from 'prop-types'


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
	
	static propTypes = {
		imagePath: PropTypes.string.isRequired,
		textToShow: PropTypes.string.isRequired
	};
	
	render() {
		
		const textToShow = this.props.textToShow || "Hello X, what is your prefered drinks ?";
		
		
		let drinks;
		if (this.props.drinks && this.props.drinks.length > 0) {
			drinks = this.props.drinks
		}
		
		const displayed = [];
		drinks.forEach(drink => {
			displayed.push(<div>
				<SpeakableButton
					image={<Drink name={drink['name']}
					              pathOnTablet={drink['pathOnTablet']}/>}
					onClick={() => this.props.sendName(this.props.dispatch, drink['name'])}
				>
					{drink['name']}
				</SpeakableButton>
			
			
			</div>)
		});
		return (
			
			<div id={"AskDrink"}>
				<ComponentTitle>{textToShow}</ComponentTitle>
				<div className="drinks">
					{displayed}
				</div>
			</div>
		);
	}
}


export default connect(mapDispatchToProps)(AskName);