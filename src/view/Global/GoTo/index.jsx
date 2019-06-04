import React, {Component} from 'react';
import PropTypes from "prop-types";
import ComponentTitle from "../reusableComponent/ComponentTitle";
import Icon from "../reusableComponent/Icon";

class Goto extends Component {
	static propTypes = {
		location : PropTypes.string.isRequired,
		textToShow : PropTypes.string,
	}
	render() {
		
		const textToShow = this.props.textToShow || "I'm going to ";
		
		let image = process.env.PUBLIC_URL + textToShow;
		
		// switch (this.props.location) {
		// 	case "bar":
		// }
		
		return (
			<div>
				<ComponentTitle>{textToShow}{this.props.location}</ComponentTitle>
				<Icon image={image} description={this.props.location}/>
			</div>
		);
	}
}

export default Goto;