import React, {Component} from 'react';
import PropTypes from "prop-types";

class Wait extends Component {
	
	static propTypes = {
		remainingTime: PropTypes.number.isRequired
	};
	
	constructor(props) {
		super(props);
		this.state = {
			remainingTime: this.props.remainingTime
		}
	}
	
	
	render() {
		
		let remainingTime = this.state.remainingTime;
		
		const minutes = remainingTime / 60;
		remainingTime %= 60;
		
		
		
		
		return (
			<div id="Wait">
				<p>
					<span id="minutes">{minutes} mn</span>
					<span id="seconds">{remainingTime} s</span>
				</p>
			</div>
		);
	}
}

export default Wait;