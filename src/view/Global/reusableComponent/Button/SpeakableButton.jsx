import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

class SpeakableButton extends Component {
	
	static propTypes = {
		onClick : PropTypes.func.isRequired,
		color: PropTypes.oneOf("info", "danger", "warning", "success")
		
	};
	
	render() {
		return (
			<button className={`btn btn-${this.props.color}`} >
				"{this.props.children}"
			</button>
		);
	}
}

export default connect(
	mapStateToProps,
)(SpeakableButton);