import React, {Component} from 'react';
import PropTypes from "prop-types";
import ConfigWrapper from "../../../controller/ConfigWrapper";

const {locations} = ConfigWrapper.get();

class Location extends Component {
	
	static propTypes = {
		id: PropTypes.string.isRequired
	};
	
	render() {
		
		console.log(locations, this.props.id);
		
		const ind = locations.findIndex(step => step.id = this.props.id)
		
		
		return (
			<img
				src={process.env.PUBLIC_URL + locations[ind].pathOnTablet}
				alt={this.props.id}/>
		);
	}
}

export default Location;