import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Icon.css'

class Icon extends Component {
	
	static propTypes = {
		image: PropTypes.node.isRequired,
		description: PropTypes.string.isRequired,
		copyright: PropTypes.string,
		animation: PropTypes.bool
	};
	
	render() {
		
		let className = "Icon";
		if (this.props.animation) {
			className += " animated"
		}
		
		return (
			<img className={className} src={this.props.image} alt={this.props.description}
			     title={this.props.copyright}/>
		);
	}
}


export default Icon;