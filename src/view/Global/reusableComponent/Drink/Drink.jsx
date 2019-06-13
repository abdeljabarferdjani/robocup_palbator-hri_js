import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ConfigWrapper from "../../../../controller/ConfigWrapper";
import './Drink.css'
const {drinks} = ConfigWrapper.get()

class Drink extends Component {
	
	static drinksNameToPathMap = {};
	
	static propTypes = {
		name: PropTypes.string.isRequired,
		alt: PropTypes.string.isRequired
	};
	render() {
		
		console.log(Drink.drinksNameToPathMap, this.props)
		
		return (
			<img className={"Drink"} src={Drink.drinksNameToPathMap[this.props.name]} alt={this.props.alt}/>
		);
	}
}

drinks.forEach(drink => {
	Drink.drinksNameToPathMap[drink['name']] = drink['pathOnTablet']
});

export default Drink;


