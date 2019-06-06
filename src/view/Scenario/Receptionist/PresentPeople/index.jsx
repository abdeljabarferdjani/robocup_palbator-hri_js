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
})

export class PresentPeople extends Component {
	
	static propTypes = {
		people: PropTypes.shape({
			who: peopleProps.isRequired,
			to : peopleProps.isRequired
		})
	}
	
	
	constructor(props) {
		super(props);
		console.log("Present People ", props)
	}
	
	render() {
		console.log(this);
		
		return (
			<div id={"PresentPerson"}>
				<Guest drinkName={this.props.people.who.drink} name={this.props.people.who.name}/>
				<Guest drinkName={this.props.people.to.drink} name={this.props.people.to.name}/>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
)(PresentPeople);