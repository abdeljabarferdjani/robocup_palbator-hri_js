import React from "react";
import PropTypes from "prop-types";
import './Guest.css'
import Drink from "../../../Global/reusableComponent/Drink/Drink";


class Guest extends React.Component {
	
	static propTypes = {
		drinkObj: PropTypes.object,
		name: PropTypes.string.isRequired,
		guestPhotoPath: PropTypes.string
	};
	
	constructor(props) {
		super(props);
		console.log("PROPS : ", props);
		
		this.state = {
			name: props.name,
			drinkObj: props.drinkObj
		};
		console.warn("Guest.state", this.state)
	}
	
	
	render()
	{
		
		let drink = this.props.drinkObj !== undefined ? <>
			<p className={"guestDrink"}>{this.state.name} likes: {this.state.drinkObj.name} </p>
			<Drink
				size={"lg"}
				name={this.state.drinkObj['name']}
				pathOnTablet={this.state.drinkObj["pathOnTablet"]}/>
		</> : null;
		
		return (
			<div className="Guest">
				<img src={this.props.guestPhotoPath} alt={this.state.name}/>
				{drink}
			</div>
		)
	}
	
	
}

export default Guest