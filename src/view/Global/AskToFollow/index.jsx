import React, {Component} from 'react';
import ComponentTitle from "../reusableComponent/ComponentTitle";
import Location from "../reusableComponent/Location";
import PropTypes from "prop-types";
import './AskToFollow.css'

class AskToFollow extends Component {
	
	static propTypes = {
		textToShow: PropTypes.string,
		location: PropTypes.object.isRequired
	};
	
	render()  {
		const textToShow = this.props.textToShow || "Please follow me";
		console.log("AskToFollow props", this.props);
		return (
			<div className={"AskToFollow"}>
				<ComponentTitle>{textToShow}</ComponentTitle>
				<Location obj={this.props.location}/>
			</div>
		);
	}
}

export default AskToFollow;