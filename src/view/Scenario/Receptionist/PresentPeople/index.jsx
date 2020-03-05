import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import Guest from "./Guest";
import './PresentPeople.css'
import {comAction} from "../../../../redux/actions/CommunicationAction";
import { viewAction } from '../../../../redux/actions/ViewAction';

function mapStateToProps(state) {
	return {};
}

const peopleProps = PropTypes.shape({
	name: PropTypes.string.isRequired,
	drink: PropTypes.object.isRequired
});

class PresentPerson extends Component {
	
	static propTypes = {
		people: PropTypes.shape({
			who: peopleProps.isRequired,
			to: PropTypes.arrayOf(peopleProps).isRequired
		})
	};
	
	
	constructor(props) {
		super(props);
		console.log("Present People ", props);
		//this.viewOk=this.viewOk.bind(this)
	}
	
	componentDidMount() {
		this.props.viewOk();
		//this.viewOk();
	}
	
	render() {
		
		let toDiv;
		if (this.props.people.to.length !== undefined) {
			// Their is an array of people
			let peoples = [];
			console.log("People TO array : ", this.props.people.to);
			this.props.people.to.forEach(guy => {
				console.log("39", guy);
				peoples.push(<Guest key={guy.name} name={guy.name} drinkObj={guy.drink}/>)
			});
			toDiv = <div>{peoples}</div>

			console.log("PEOPLES ",peoples)
		}
		
		return (
			<div className={"PresentPerson"}>
				<Guest drinkObj={this.props.people.who.drink}
				       name={this.props.people.who.name}/>
				{toDiv}
			</div>
		);
	}
/*
	viewOk() {
		this.props.store.dispatch({
			type: viewAction.getIndexCurrentAction.type
		});
		this.props.store.dispatch({
			type: comAction.dataJs.type,
			data: {status: 200}
		})
	}
*/

}

const mapDispatchToProps = (dispatch) => {
	return {
		viewOk: () => {
			dispatch({
				type: viewAction.getIndexCurrentAction.type
			});
			dispatch({
				type: comAction.dataJs.type,
				data: {status: 200}
			})
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(PresentPerson);
