import React, {Component} from 'react';
import ComponentTitle from "../reusableComponent/ComponentTitle";
import Location from "../reusableComponent/Location";
import PropTypes from "prop-types";
import './AskToFollow.css'
class AskToFollow extends Component {
	
	static propTypes = {
		textToShow: PropTypes.string,
		location: PropTypes.string.isRequired
	};
	
	render() {
		
		const textToShow = this.props.textToShow || "Please follow me";
		console.log(this.props);
		return (
			<div className={"AskToFollow"}>
				<ComponentTitle>{textToShow}</ComponentTitle>
				<Location id={this.props.location}/>
			</div>
		);
	}
}

export default AskToFollow;