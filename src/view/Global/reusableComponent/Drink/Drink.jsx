import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Drink.css'


class Drink extends Component {
	
	static drinksNameToPathMap = {};
	
	static propTypes = {
		name: PropTypes.string.isRequired,
		pathOnTablet: PropTypes.string.isRequired
	};
	
	render() {
		
		return (
			<img className={"Drink"}
			     src={this.props.pathOnTablet}
			     alt={this.props.name}/>
		);
	}
}

export default Drink;


