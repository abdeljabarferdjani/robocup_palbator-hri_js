import React, {Component} from 'react';
import SpeakableButton from "../reusableComponent/Button/SpeakableButton";
import {comAction} from "../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import './AskSomething.css'
import ComponentTitle from "../reusableComponent/ComponentTitle";
import Drink from "../reusableComponent/Drink/Drink";
import PropTypes from 'prop-types'
import { viewAction } from '../../../redux/actions/ViewAction';


const mapDispatchToProps = (dispatch) => {

	// if( this.props.drinks) data_type = comAction.dataJs.dataType.drink
	// if( this.props.names) data_type = comAction.dataJs.dataType.name
	return {
		sendName: (dispatch, name) => {
			dispatch({
				type: viewAction.getIndexCurrentAction.type
			});
			dispatch({
				type: comAction.dataJs.type,
				dataType: comAction.dataJs.dataType.drink,
				data: name
			});
		}
	}
};


class AskSomething extends Component {
	
	static propTypes = {
		imagePath: PropTypes.string.isRequired,
		textToShow: PropTypes.string.isRequired
	};
	
	render() {
		
		const textToShow = this.props.textToShow;
		
		let data_type;
		let drinks;
		let names;
		const displayed = [];
		if (this.props.drinks && this.props.drinks.length > 0) {
			drinks = this.props.drinks
			
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

		// data_type = comAction.dataJs.dataType.drink
		}

		if (this.props.names && this.props.names.length > 0) {
			names = this.props.names

			names.map(name => {
				displayed.push(<div>
					<SpeakableButton
						onClick={() => this.props.sendName(this.props.dispatch, name.name)}>{name.name}
					</SpeakableButton>
				
				
				</div>)
			});

			// data_type = comAction.dataJs.dataType.name
		}
		
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


export default connect(mapDispatchToProps)(AskSomething);