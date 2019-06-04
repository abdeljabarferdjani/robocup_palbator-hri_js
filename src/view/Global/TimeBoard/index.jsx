import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import Step from "./Step";
import Logger from "../../../dev/Logger";
import debug from '../../../config/log'
import './TimeBoard.css'
import {viewAction} from "../../../redux/actions/ViewAction";

function mapStateToProps(state) {
	return {
		time: state.time,
		view: state.view
	};
}

class TimeBoard extends Component {
	
	
	static logger = new Logger(debug.TimeBoard, "TimeBoard");
	
	static propTypes = {
		className: PropTypes.string,
	};
	
	constructor(props) {
		super(props);
		
		TimeBoard.logger.log("constructor", this.props);
		
		const steps = TimeBoard.createStepFromProps(props);
		
		
		this.state = {
			sortedSteps: steps,
			globalElapsedTime: props.time.globalElapsedTime,
			doneSteps: [...props.time.doneSteps],
			skippedSteps: [...props.time.skippedSteps],
			todoSteps: [...props.time.todoSteps],
			visible: props.view.componentVisibility.timeBoard,
			parentDiv: null
			
		};
		
		
		TimeBoard.logger.log("constructor", this.state);
		
		
	}
	
	static compareSteps(nextSteps, oldSteps) {
		
		if (nextSteps.length !== oldSteps.length) {
			return true
		}
		
		for (let i = 0; i < nextSteps.length; i++) {
			if(nextSteps[i] !== undefined && oldSteps[i] !== undefined) {
				if(nextSteps[i].status !== oldSteps[i].status) {
					return true
				}
			}
		}
		
		return false;
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		
		if (prevState.visible !== nextProps.view.componentVisibility.timeBoard) {
			// console.warn("HEY 1");
			const bool = (nextProps.view.componentVisibility.timeBoard === viewAction.setComponentVisibility.state.visible);
			
			return {
				visible: bool
			}
		}
		
		const newSortedSteps = TimeBoard.createStepFromProps(nextProps);
		if (TimeBoard.compareSteps(newSortedSteps, prevState.sortedSteps))
		{
			console.warn("Hey 2.2")
			return {
				sortedSteps: TimeBoard.createStepFromProps(nextProps),
				globalElapsedTime: nextProps.time.globalElapsedTime,
				doneSteps: [...nextProps.time.doneSteps],
				skippedSteps: [...nextProps.time.skippedSteps],
				todoSteps: [...nextProps.time.todoSteps],
			}
		}
		
		
		return null;
	}
	
	static createStepFromProps(props) {
		const steps = [];
		
		props.time.doneSteps.forEach(step => {
			steps.push({
				...step,
				status: Step.Status.done,
				
			})
		});
		
		if (props.time.currentStep !== null) {
			steps.push({
				...props.time.currentStep,
				status: Step.Status.current,
			});
		}
		
		props.time.todoSteps.forEach(step => {
			steps.push({
				...step,
				status: Step.Status.todo,
			})
		});
		
		props.time.skippedSteps.forEach(step => {
			
			steps.push({
				...step,
				status: Step.Status.skipped,
			})
			
		});
		
		
		steps.sort((stepA, stepB) => {
			
			return stepA.id < stepB.id ? -1 : 1;
		});
		
		
		return steps;
	}
	
	render() {
		let className = "TimeBoard ";
		className += (this.props.className) ? this.props.className : "";
		
		if (this.state.parentDiv) {
			if (this.state.visible === viewAction.setComponentVisibility.state.hidden) {
				
				this.state.parentDiv.classList.add("hidden");
				
			} else {
				this.state.parentDiv.classList.remove("hidden");
			}
		}
		
		const steps = [];
		
		this.state.sortedSteps.forEach(((step, index) => {
			steps.push(<Step step={step} key={index}/>);
		}));
		
		if (steps.length > 0) {
			return (
				<div className={className}>
					<h1 className={"componentTitle"}>Steps</h1>
					<div id="steps">
						{steps}
					</div>
				</div>
			);
		} else {
			return (
				<div className={className + " hidden"}/>
			)
		}
		
	}
}

export default connect(
	mapStateToProps,
)(TimeBoard);