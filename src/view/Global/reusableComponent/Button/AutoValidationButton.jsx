import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import {SpeakableButton} from "./SpeakableButton";
import './Button.css'
import PropTypes from "prop-types";
import ReactTestUtils from 'react-dom/test-utils'; // ES6

class AutoValidationButton extends Component {
	
	
	static propTypes = {
		timeout: PropTypes.number.isRequired, // timeout in second before the button is automaticly pressed.
		...SpeakableButton.propTypes
	};
	subButton = React.createRef();
	
	static drawToXY(canvas, x, y) {
		
		const ctx = canvas.getContext("2d");
		
		ctx.beginPath();
		ctx.moveTo(canvas.width / 2, canvas.height / 2);
		ctx.lineTo(x, y);
		// ctx.fillRect(i, 0, size, size); // fill in the pixel at (10,10)
		ctx.strokeStyle = "rgb(244,248,255)";
		// todo change this color, its ugly.
		ctx.stroke();
	}
	
	componentWillUnmount() {
		clearInterval(this.inter)
	}
	
	componentDidMount() {
		const canvas = document.querySelector("canvas#canvasOK");
		const ctx = canvas.getContext("2d");
		
		
		canvas.height = ReactDOM.findDOMNode(this).clientHeight;
		canvas.width = ReactDOM.findDOMNode(this).clientWidth;
		
		
		ctx.moveTo(canvas.width / 2, canvas.height / 2);
		
		let i = 0;
		
		this.inter = setInterval(() => {
			if (i > Math.PI * 2)
			{
				clearInterval(this.inter);
				ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(this.subButton));
			} else {
				AutoValidationButton.drawToXY(canvas, canvas.width * Math.cos(i) + canvas.height / 2, canvas.height * Math.sin(i) + canvas.height / 2);
				
			}
			
			// Decrease it if you want to detail the animation care about performances issues
			i += 0.005;
			
			
		}, this.props.timeout * 1000 / 628);
		// 'timeout' * 1000 / 2 * PI * 100 => the animation will work for 'timeout' seconds
		
	}
	
	render() {
		return (
			<div className={"AutoValidationButton"}>
				
				<SpeakableButton color={this.props.color}
				                 onClick={this.props.onClick}
				                 ref={ref => this.subButton = ref}>
					<span>
						{this.props.children}
					</span>
					<canvas id={"canvasOK"}/>
				</SpeakableButton>
			
			</div>
		);
	}
}

export default AutoValidationButton