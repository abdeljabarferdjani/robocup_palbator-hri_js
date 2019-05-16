import React, {Component} from 'react';
import PropTypes from "prop-types";
import './Steps.css'
import ProgressBar from "../reusableComponent/ProgressBar";
import {connect} from "react-redux";
import logConfig from '../../../config/log'
import Logger from "../../../dev/Logger";

const mapStateToProps = (state) => {
	return {
		time: state.time
	}
};

class Step extends Component {
	
	static Status = {
		done: "done",
		todo: "todo",
		current: "current",
		skipped: "skipped"
		
	};
	
	static propTypes = {
		currentTime: PropTypes.number, // only supplied if it's the current Step
		step: PropTypes.object.isRequired
	};
	
	static defaultProps = {};
	
	static logger = new Logger(logConfig.Step, "Step");
	
	
	constructor(props) {
		super(props);
		
		this.state = {
			order: props.step.order,
			currentTime: props.time.stepElapsedTime,
			progressBarRef: React.createRef()
		};
		
		
		Step.logger.log("Constructor : time :", props.time);
		Step.logger.log("Constructor : state :", this.state);
		
	}
	
	
	static getDerivedStateFromProps(nextProps, prevState) {
		
		// if the step's order match, I have to update
		if (nextProps.time.currentStep && nextProps.time.currentStep.order === prevState.order) {
			
			if (prevState.progressBarRef.current)
			{
				Step.logger.log("Time", nextProps.time);
				prevState.progressBarRef.current.changeCurrentValue(nextProps.time.stepElapsedTime);
				
			}
			return {
				...prevState,
				currentTime: nextProps.time.stepElapsedTime
			}
			
			
		}
		
		
		return null;
	}
	
	render() {
		
		
		let currentTime = (this.state.currentTime !== undefined) ? this.state.currentTime : 0;
		
		
		let className = `Step`;
		if (this.props.time.currentStep && this.state.order === this.props.time.currentStep.order) {
			className += " current";
		} else {
			if (this.props.time.todoSteps.findIndex(step => step.order === this.state.order) !== -1)
			{
				className += " todo"
			} else {
				if (this.props.time.skippedSteps.findIndex(step => step.order === this.state.order) !== -1)
				{
					className += " skipped"
				} else {
					if (this.props.time.doneSteps.findIndex(step => step.order === this.state.order) !== -1)
					{
						className += " done"
					}
				}
				
			}
		}
		
		
		// Step.logger.log("render", this.props.step);
		const eta = Math.round(this.props.step.eta - currentTime);
		Step.logger.log("Render ETA", this.props.step.eta);
		return (
			<div className={className}>
				<p>{this.props.step.name} </p> <span className="eta">{eta}s</span>
				
				<ProgressBar ref={this.state.progressBarRef} current={currentTime}
				             max={this.props.step.eta}/>
			
			</div>
		);
	}
}

export default connect(mapStateToProps)(Step);

