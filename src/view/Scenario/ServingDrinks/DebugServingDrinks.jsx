import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from "reactstrap";
import {viewAction} from "../../../redux/actions/ViewAction";
import QiWrapper from "../../../model/QiWrapper";
import ConfigWrapper from "../../../controller/ConfigWrapper";
import PropTypes from "prop-types";

const {ALMemoryEvent} = ConfigWrapper.get();


function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		timeStepComplete: function (steps, taskId) {
			
			QiWrapper.raise(ALMemoryEvent.setStepCompleted.ALMemory, {step: null})
		},
		
		
		timeStepSkipped: function (steps, taskId) {
			
			const step = steps[taskId];
			
			QiWrapper.raise(ALMemoryEvent.setStepSkipped.ALMemory, {
				step: step
			})
			
		},
		
		timeStepChangeCurrent: function (steps, taskId) {
			
			const step = steps[taskId];
			
			QiWrapper.raise(ALMemoryEvent.changeCurrentStep.ALMemory, {
				step: step
			});
			//
			// dispatch({
			// 	type: timeAction.changeCurrentStep.type,
			// 	step: step
			// })
			
		},
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
				<div id="changeView">
					<h3>View</h3>
					<h4>changeView</h4>
					<Button color={"info"}
					        onClick={() => this.props.changeView(viewAction.view.moving)}>Moving</Button>
					<Button color={"info"} onClick={() => this.props.changeView(viewAction.view.askDrink)}>Ask
						Drink</Button>
					<Button color={"info"} onClick={() => this.props.changeView(viewAction.view.askName)}>Ask
						Name</Button>
					<Button color={"info"} onClick={() => this.props.changeView(viewAction.view.findDrinks)}>Find
						Drinks</Button>
					<Button color={"info"} onClick={() => this.props.changeView(viewAction.view.deliverDrink)}>Deliver
						Drinks
					</Button>
					<Button color={"info"} onClick={() => this.props.changeView(viewAction.view.detailDrink)}>Detail
						Drinks</Button>
					<Button color={"info"} onClick={() => this.props.changeView(viewAction.view.idle)}>None</Button>
					
					<h4>Component visibility</h4>
					
					<Button
						onClick={() => this.props.toggleTimeBoardVisibilty(this.props.view.componentVisibility.timeBoard)}
						color={"info"}>Toggle timeBoard Visibility</Button>
				</div>
				
				<div id="steps">
					<select onChange={evt => {
						evt.persist();
						this.setState(prev => {
							return {
								...prev,
								currentStep: evt.target.value
							}
						})
					}}>{stepOptions}</select>
					<Button color={"info"} onClick={() => this.props.timeStepSkipped(steps, this.state.currentStep)}>Pass
						step</Button>
					<Button color={"info"} onClick={() => this.props.timeStepComplete(this.state.currentStep)}>Complete
						Step</Button>
					<Button color={"info"}
					        onClick={() => this.props.timeStepChangeCurrent(steps, this.state.currentStep)}>Change
						current
						step
					</Button>
				</div>
			
			
			</div>
		);
	}
}

export default connect(
	mapStateToProps, mapDispatchToProps
)(DebugServingDrinks);