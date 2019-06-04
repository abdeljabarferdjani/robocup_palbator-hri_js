import React, {Component} from 'react';
import PropTypes from "prop-types";


class DebugServingDrinks extends Component {
	
	
	static propTypes = {
		steps: PropTypes.array.isRequired
	};
	
	constructor(props) {
		super(props);
		this.state = {
			currentStep: undefined
		}
	}
	
	
	render() {
		
		return (
			<div>
			
			
			</div>
		);
	}
}

export default DebugServingDrinks;