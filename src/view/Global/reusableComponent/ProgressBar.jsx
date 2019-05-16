import React, {Component} from 'react';
import PropTypes from "prop-types";
import './ProgressBar.css'
import Logger from "../../../dev/Logger";
import logConfig from '../../../config/log'

const DEFAULT_COLOR = {r: 102, g: 226, b: 23};


class ProgressBar extends Component {
	
	static propTypes = {
		current: PropTypes.number.isRequired,
		max: PropTypes.number.isRequired,
	};
	
	static defaultProps = {
		current: -1
	};
	
	static logger = new Logger(logConfig.ProgressBar, "ProgressBar");
	
	
	constructor(props) {
		
		
		super(props);
		this.state = {
			max: props.max,
			current: props.current,
			color: {...DEFAULT_COLOR},
		}
	}
	
	
	changeCurrentValue = (newValue) => {
		
		this.setState(prev => {
			return {
				...prev,
				current: newValue
			}
		}, () => ProgressBar.logger.log("changeCurrentValue : New state : ", this.state))
	};
	
	static addToColor(color, field, value) {
		if (color[field] !== undefined) {
			color[field] = (color[field] + value < 255) ? color[field] + value : 255
		}
	}
	
	
	static removeToColor(color, field, value) {
		if (color[field] !== undefined) {
			color[field] = (color[field] - value > 0) ? color[field] - value : 0
		}
	}
	
	static convertToHex(color) {
		
		function getHexValue(value) {
			let str = value.toString(16);
			if (str.length === 1) {
				str = "0" + str;
			}
			
			return str;
		}
		
		return `#${getHexValue(color.r)}${getHexValue(color.g)}${getHexValue(color.b)}`
	}
	
	
	render() {
		
		let percentLoad = 0;
		
		
		if (this.state.current >= 0) {
			
			percentLoad = Math.round(this.state.current / this.state.max * 100);
		}
		
		let color = this.state.color;
		
		const deltaColor = Math.round(255 / this.state.max);
		if (percentLoad > 50 && percentLoad <= 150) {
			ProgressBar.addToColor(color, 'r', deltaColor)
			
		}
		if (percentLoad > 150) {
			ProgressBar.removeToColor(color, 'g', deltaColor)
		}
		
		percentLoad = percentLoad < 100 ? percentLoad : 100;
		
		
		const style = {
			"width": `${percentLoad}%`,
			"backgroundColor": ProgressBar.convertToHex(color)
		};
		
		
		let className = "ProgressBar";
		if (this.props.className)
			className += ` ${this.props.className}`;
		
		return (
			<div className={className} style={style}/>
		);
	}
}

export default ProgressBar;