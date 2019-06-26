import React from 'react';
import PropTypes from "prop-types";
import './Location.css'

function Location(props) {
	
	return (
		<img className={"Location"}
		     src={props.obj["pathOnTablet"]}
		     alt={props.obj["name"]}/>
	);
}

Location.propTypes = {
	obj: PropTypes.object.isRequired
};

export default Location;