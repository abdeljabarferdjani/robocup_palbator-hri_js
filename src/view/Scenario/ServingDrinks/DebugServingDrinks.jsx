import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from "reactstrap";
import QiWrapper from "../../../model/QiWrapper";
import ConfigWrapper from "../../../controller/ConfigWrapper";
import PropTypes from "prop-types";

const {ALMemoryEvent} = ConfigWrapper.get();


function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {

		
		changeCurrentView: (view) => {
		
		}
		
	}
}

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
		
		const steps = this.props.steps;
		
		const stepOptions = [];
		for (let i = 0; i < steps["length"]; i++) {
			
			stepOptions.push(<option key={i} value={i}>{steps[i].name}</option>)
		}
		
		
		return (
			<div>


			
			
			</div>
		);
	}
}

export default connect(
	mapStateToProps, mapDispatchToProps
)(DebugServingDrinks);