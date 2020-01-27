import React, {Component} from 'react';
import PropTypes from "prop-types";
import "./Goto.css"
import {comAction} from "../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import Generic from "../../Generic";
import ComponentTitle from "../reusableComponent/ComponentTitle";
import Location from "../reusableComponent/Location";


class Goto extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		textToShow: PropTypes.string.isRequired,
	};
	
	componentDidMount() {
		this.props.viewOk();
	}
	
	render() {
		
		const textToShow = this.props.textToShow || "I'm going to the ";
		// return (
		// 	<div className="Goto">
		// 		<Generic image={this.props.location}
		// 		         title={this.props.textToShow}
		// 		/>
		// 	</div>
		
		// )
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