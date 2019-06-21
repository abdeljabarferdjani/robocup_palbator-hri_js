import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

function mapStateToProps(state) {
	return {};
}


export class SpeakableButton extends Component {
	
	static propTypes = {
		onClick: PropTypes.func.isRequired,
		color: PropTypes.oneOf(["info", "danger", "warning", "success", "ok", "no"]),
		image: PropTypes.object
	};
	
	
	render() {
		
		const color = this.props.color || "classic";
		
		let image = this.props.image || "";
		return (
			<button onClick={this.props.onClick} className={`btn btn-${color}`}>
				{image}
				<p>"{this.props.children}"</p>
			</button>
		);
	}
}

export default connect(
	mapStateToProps,
)(SpeakableButton);