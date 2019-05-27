import React, {Component} from 'react';
import {getAllViewsKey} from "../../controller/ViewStepBridge";
import './ViewSimulator.css'
import QiWrapper from "../../model/QiWrapper";
import ConfigWrapper from "../../controller/ConfigWrapper";

const {apis : {generalManagerHRI}} = ConfigWrapper.get()

class ViewSimulator extends Component {
	
	
	constructor(props) {
		super(props);
		this.state = {
			currentViewSelected: null,
			currentJson: '{\n' +
				'\t"textToShow": "",\n' +
				'\t"imagePath": "",\n' +
				'\t"choices": [],\n' +
				'\t"people": {\n\t\t"who": {\n\t\t\t"name": "",\n\t\t\t"drinkId": 0\n\t\t}, \n\t\t"to": {\n\t\t\t"name": "",\n\t\t\t"drinkId": 1\n\t\t}\n\t},\n' +
				'\t"location": ""\n' +
				'}',
		};
	}
	
	handleSelectChange = evt => {
		evt.persist();
		this.setState(prev => {
			return {
				...prev,
				currentViewSelected: evt.target.value
			}
		})
	};
	
	handleJsonChange = evt => {
		evt.persist()
		this.setState(prev => {
			return {
				...prev,
				currentJson: evt.target.value
			}
		})
	};
	
	handleSubmit = e => {
		e.preventDefault();
		
		let json = this.state.currentJson.replaceAll("[\n\t]", "");
		console.log("json : ", json);
		json = JSON.parse(json);
		
		console.log("Submit", QiWrapper.raise(generalManagerHRI.currentView.ALMemory, {
			data : json,
			view : this.state.currentViewSelected
		}));
	};
	
	render() {
		
		const options = [];
		getAllViewsKey().forEach(view => {
			options.push(<option value={view}>{view}</option>)
		});
		
		
		return <div id={"ViewSimulator"}>
			<form action="" onSubmit={e => this.handleSubmit(e)}>
				<div>
					<label htmlFor="select">Select a view</label>
					<select
						value={this.state.currentViewSelected}
						id={"select"}
						onChange={event => this.handleSelectChange(event)}>{options}</select>
				</div>
				
				<div><label htmlFor="textArea">Write Data in JSON</label>
					<textarea id={"textArea"}
					          onChange={e => this.handleJsonChange(e)}
					          value={this.state.currentJson}>
					</textarea></div>
				
				<button className={"btn-info"} type="submit">Change View
				</button>
			</form>
		</div>;
	}
}

export default ViewSimulator;