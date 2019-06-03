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
	
	static getDerivedStateFromProps(nextProps, prevState) {
		console.warn("HEY ! ");
		
		if (prevState.visible !== nextProps.view.componentVisibility.timeBoard) {
			// console.warn("HEY 1");
			const bool = (nextProps.view.componentVisibility.timeBoard === viewAction.setComponentVisibility.state.visible);
			
			return {
				visible: bool
			}
		}
		
		const newSortedSteps = TimeBoard.createStepFromProps(nextProps);
		
		
		console.debug(newSortedSteps, prevState.sortedSteps);
		
		
		if (
			(
				newSortedSteps[0] !== undefined
				&& prevState.sortedSteps[0] !== undefined
				&& newSortedSteps[0].id !== prevState.sortedSteps[0].id
			)
			|| newSortedSteps.length !== prevState.sortedSteps.length)
		{
			
			console.warn("HEY 2", newSortedSteps[0] !== prevState.sortedSteps[0], newSortedSteps.length !== prevState.sortedSteps.length);
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
			
			return stepA.order < stepB.order ? -1 : 1;
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