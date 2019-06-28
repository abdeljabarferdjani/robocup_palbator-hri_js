import React, {Component} from 'react';
import PropTypes from "prop-types";
import ComponentTitle from "../reusableComponent/ComponentTitle";
import "./Goto.css"
import Location from "../reusableComponent/Location";
import {comAction} from "../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";


class Goto extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		textToShow: PropTypes.string,
	};
	
	componentDidMount() {
		this.props.viewOk();
	}
	
	render() {
		
		const textToShow = this.props.textToShow || "I'm going to the " ;
		return (
			<div className={"Goto"}>
				<ComponentTitle>{textToShow}</ComponentTitle>
				<div><Location obj={this.props.location}/></div>
			
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

export default connect(mapStateToProps, mapDispatchToProps)(Goto);