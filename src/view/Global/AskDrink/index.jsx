import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

const mapDispatchToProps = {
	orderComplete: (dispatch) => {
		dispatch({
			type: {}
		})
	}
};


function mapStateToProps(state) {
	return {};
}


class AskDrink extends Component {
	static propTypes = {
		confirm : PropTypes.bool.isRequired
	};
	
	static defaultProps = {
		confirm : true
	};
	constructor(props) {
		super(props);
		
	}
	
	
	render() {
		return (
			<div>
				Votre Boisson ?
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AskDrink);