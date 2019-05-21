import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import {SpeakableButton} from "./SpeakableButton";
import './Button.css'

class AutoValidationButton extends Component {
	
	
	drawToXY(canvas, x, y) {
		
		const ctx = canvas.getContext("2d");
		
		ctx.beginPath()
		ctx.moveTo(canvas.width / 2, canvas.height / 2);
		ctx.lineTo(x, y);
		// ctx.fillRect(i, 0, size, size); // fill in the pixel at (10,10)
		ctx.strokeStyle = "rgb(224,255,216)";
		// todo change this color, its ugly.
		ctx.stroke();
	}
	
	componentDidMount() {
		const canvas = document.querySelector("canvas#canvasOK");
		const ctx = canvas.getContext("2d");
		
		
		canvas.height = ReactDOM.findDOMNode(this).clientHeight;
		canvas.width = ReactDOM.findDOMNode(this).clientWidth;
		
		console.log(canvas.height, canvas.width);
		
		
		ctx.moveTo(canvas.width / 2, canvas.height / 2);
		
		let i = 0;
		
		const inter = setInterval(() => {
			if (i > Math.PI * 2)
			{
				clearInterval(inter);
			} else {
				this.drawToXY(canvas, canvas.width * Math.cos(i) + canvas.height / 2, canvas.height * Math.sin(i) + canvas.height / 2);
				
			}
			
			
			i += 0.005;
		}, 10000 / 628);
		
		
	}
	
	
	render() {
		return (
			<div className={"AutoValidationButton"}>
				
				<SpeakableButton color={this.props.color}
				                 onClick={this.props.onClick}><span>{this.props.children}</span><canvas id={"canvasOK"}/></SpeakableButton>
			
			</div>
		);
	}
}

export default AutoValidationButton