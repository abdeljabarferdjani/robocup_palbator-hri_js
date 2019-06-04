import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
	return {};
}

export class PresentPeople extends Component {
	
	
	render() {
		return (
			<div id={"PresentPerson"}>
				Present Person
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
)(PresentPeople);