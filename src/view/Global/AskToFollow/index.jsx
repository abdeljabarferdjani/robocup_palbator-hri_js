import React, {Component} from 'react';
import ComponentTitle from "../reusableComponent/ComponentTitle";
import Location from "../reusableComponent/Location";
import PropTypes from "prop-types";
import './AskToFollow.css'
import {comAction} from "../../../redux/actions/CommunicationAction";

import {connect} from "react-redux";

class AskToFollow extends Component {
	
	static propTypes = {
		textToShow: PropTypes.string,
		location: PropTypes.object.isRequired
	};
	
	componentDidMount() {
		this.props.viewOk();
	}
	
	render() {
		const textToShow = this.props.textToShow || "Please follow me";
		console.log("AskToFollow props", this.props);
		return (
			<div className={"AskToFollow"}>
				<ComponentTitle>{textToShow}</ComponentTitle>
				<Location obj={this.props.location}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {}
};

const mapDispatchToProps = (dispatch) => {
	return {
		viewOk: () => {
			dispatch({
				type: comAction.dataJs.type,
				data: {status: 200}
			})
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(AskToFollow);