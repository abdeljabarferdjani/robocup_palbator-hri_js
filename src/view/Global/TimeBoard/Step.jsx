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
		step: PropTypes.shape({
			status: PropTypes.oneOf(Step.Status.current, Step.Status.todo, Step.Status.skipped, Step.Status.done),
			eta: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired
		}).isRequired
	};
	
	static defaultProps = {};
	
	static logger = new Logger(logConfig.Step, "Step");
	
	reset() {
		this.setState(prev => {
			return {
				...prev,
				progressBarKey: Date.now(),
				currentTime: 0
			}
		})
	}
	
	constructor(props) {
		super(props);
		
		this.state = {
			id: props.step.id,
			order: props.step.order,
			currentTime: props.time.stepElapsedTime,
			progressBarRef: React.createRef(),
			progressBarKey: Date.now()
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
		
		
		let className = `Step ${this.props.step.status}`;
		
		const eta = Math.round(this.props.step.eta - currentTime);
		Step.logger.log("Render ETA", this.props.step.eta);
		return (
			<div className={className}>
				<p>{this.props.step.name} </p> <span
				className="eta">{eta}s</span>
				
				<ProgressBar ref={this.state.progressBarRef}
				             current={currentTime}
				             key={this.state.progressBarKey}
				             max={this.props.step.eta}/>
			
			</div>
		);
	}
}

export default connect(mapStateToProps)(Step);

