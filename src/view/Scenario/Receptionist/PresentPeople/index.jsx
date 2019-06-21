import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import Guest from "./Guest";
import './PresentPeople.css'

function mapStateToProps(state) {
	return {};
}

const peopleProps = PropTypes.shape({
	name: PropTypes.string.isRequired,
	drink: PropTypes.number.isRequired
});

export class PresentPeople extends Component {
	
	static propTypes = {
		people: PropTypes.shape({
			who: peopleProps.isRequired,
			to:  PropTypes.arrayOf(peopleProps).isRequired
		})
	};
	
	
	constructor(props) {
		super(props);
		console.log("Present People ", props)
	}
	
	render() {
		
		let toDiv;
		if (this.props.people.to.length !== undefined) {
			// Their is an array of people
			let peoples = [];
			this.props.people.to.forEach(guy => {
				peoples.push(<Guest drinkName={guy["drink"]}
				                    name={guy["name"]}/>)
			});
			toDiv = <div>{peoples}</div>
		}
		
		return (
			<div className={"PresentPeople"}>
				<Guest drinkName={this.props.people.who.drink}
				       name={this.props.people.who.name}/>
				{toDiv}>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
)(PresentPeople);