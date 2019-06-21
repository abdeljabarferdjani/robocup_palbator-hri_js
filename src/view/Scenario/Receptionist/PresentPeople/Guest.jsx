import ConfigWrapper from "../../../../controller/ConfigWrapper";
import React from "react";
import PropTypes from "prop-types";
import './Guest.css'
import Drink from "../../../Global/reusableComponent/Drink/Drink";

const {drinks} = ConfigWrapper.get();

class Guest extends React.Component {
	
	static propTypes = {
		drinkName: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		guestPhotoPath: PropTypes.string
	};
	
	constructor(props) {
		super(props);
		console.log("PROPS : ", props);
		console.log("ALL Drinks", drinks);
		let drinkObj;
		for (const drink of drinks) {
			if (drink.name === props.drinkName) {
				drinkObj = drink;
				break;
			}
		}
		this.state = {
			name: props.name,
			drinkObj: drinkObj
		};
		console.warn("Guest.state", this.state)
	}
	
	
	render()
	{
		
		return (
			<div className="Guest">
				{/*<p className="guestName">{this.state.name}</p>*/}
				<img src={this.props.guestPhotoPath} alt={this.state.name}/>
				<p className={"guestDrink"}>{this.state.name} likes: {this.state.drinkObj.name} </p>
				<Drink
					name={this.state.drinkObj['name']}
					alt={this.state.drinkObj["name"]}/>
			</div>
		)
	}
	
	
}

export default Guest