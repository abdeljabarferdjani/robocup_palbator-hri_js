import React from 'react';
import PropTypes from "prop-types";
import './People.css'

function People(props) {
	
	return (
		<img className={"People"}
		     src={props.obj["guestPhotoPath"]}
		     alt={props.obj["name"]}/>
	);
}

Location.propTypes = {
	obj: PropTypes.object.isRequired
};

export default People;