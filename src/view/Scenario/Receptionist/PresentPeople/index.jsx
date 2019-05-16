import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import Guest from "../../../../model/Receptionist/Guest";

function mapStateToProps(state) {
	return {};
}

class PresentPeople extends Component {
	
	static propTypes = {
		human1 : PropTypes.instanceOf(Guest),
		human2 : PropTypes.instanceOf(Guest)
	};
	
	render() {
		return (
			<div>
			
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
)(PresentPeople);