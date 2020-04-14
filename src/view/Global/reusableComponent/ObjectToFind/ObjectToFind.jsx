import React from 'react';
import PropTypes from "prop-types";
import './ObjectToFind.css';

class ObjectToFind extends React.Component {
	
	static propTypes = {
		name: PropTypes.string.isRequired,
		pathOnTablet: PropTypes.string.isRequired
	};
	
	constructor(props) {
		super(props);
		console.log("PROPS : ", props);
		
		this.state = {
			name: props.name,
			pathOnTablet: props.pathOnTablet
		};
		console.warn("Object.state", this.state)
	}
	
	
	render()
	{
		return (
			<div className="ObjectToFind">
				<img src={this.state.pathOnTablet} alt={this.state.name}/>
			</div>
		)
	}
	
	
}

export default ObjectToFind