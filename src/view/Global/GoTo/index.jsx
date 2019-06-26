import React, {Component} from 'react';
import PropTypes from "prop-types";
import ComponentTitle from "../reusableComponent/ComponentTitle";
import "./Goto.css"
import Location from "../reusableComponent/Location";

class Goto extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		textToShow: PropTypes.string,
	};
	
	render() {
		
		const textToShow = this.props.textToShow || "I'm going to the ";
		return (
			<div className={"Goto"}>
				<ComponentTitle>{textToShow}</ComponentTitle>
				{/*<Icon image={this.props.location} description={this.props.location}/>*/}
				<Location obj={this.props.location}/>
			</div>
		);
	}
}

export default Goto;