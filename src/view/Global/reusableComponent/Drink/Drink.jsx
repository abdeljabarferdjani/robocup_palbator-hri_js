import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Drink.css'


class Drink extends Component {
	
	static drinksNameToPathMap = {};
	
	static propTypes = {
		name: PropTypes.string.isRequired,
		pathOnTablet: PropTypes.string.isRequired,
		size: PropTypes.oneOf(["sm", "me", "lg"])
	};
	
	render() {
		let className = "Drink " + this.props.size;
		
		return (
			<img className={className}
			     src={this.props.pathOnTablet}
			     alt={this.props.name}/>
		);
	}
}

export default Drink;


