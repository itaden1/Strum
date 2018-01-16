import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const strings = {
	1:Array(8).fill(''),
	2:Array(8).fill(''),
	3:Array(8).fill(''),
	4:Array(8).fill(''),
	5:Array(8).fill(''),
	6:Array(8).fill(''),
}

class Fret extends Component{

	render(){
		return(
			<div className = "fret" onClick={() => this.props.onClick()}>
					{ this.props.value }
			</div>
		)
	}
}

class App extends Component {
	constructor(props){
		super(props)
		this.state = strings;
	}
	addNote(v, k, s){
		const notes = this.state;
		var note = notes[s][k];
		for(var n=0;n<notes[s].length;n++){
			notes[s][n] = ''
		}
		if(note === ''){
			notes[s][k] = 'X';
		}
		this.setState({notes: notes})
	}
	renderString(i){
		const string = this.state[i]
		const notes = string.map( (value, key) => 
				<Fret 
					key = {key}
					value = {value}
					onClick = {() => this.addNote(value,key,i)}
				/>
		);
		return (
			<span>{notes}</span>
		);
	}
	render() {
	return (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1 className="App-title">Welcome to Strum</h1>
		</header>
		<div className = "guitar">
			<div className = "graphics">
				<div className = "fret-graphic">
				</div>
				<div className = "fret-graphic">
				</div>
				<div className = "fret-graphic">
				</div>
				<div className = "fret-graphic">
				</div>
				<div className = "fret-graphic">
				</div>
				<div className = "fret-graphic">
				</div>
				<div className = "fret-graphic">
				</div>
				<div className = "str-graphic">
				</div>
				<div className = "str-graphic">
				</div>
				<div className = "str-graphic">
				</div>
				<div className = "str-graphic">
				</div>
				<div className = "str-graphic">
				</div>
				<div className = "str-graphic">
				</div>
			</div>
			<div className = "boxes">
				<div className = "string">
					{this.renderString(1)}
				</div>
				<div className = "string">
					{this.renderString(2)}
				</div>
				<div className = "string">
					{this.renderString(3)}
				</div>
				<div className = "string">
					{this.renderString(4)}
				</div>
				<div className = "string">
					{this.renderString(5)}
				</div>
				<div className = "string">
					{this.renderString(6)}
				</div>
			</div>
		</div>
	</div>
);
}
}

export default App;
