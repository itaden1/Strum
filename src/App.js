import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const strings = {
	1:Array(8).fill(null),
	2:Array(8).fill(null),
	3:Array(8).fill(null),
	4:Array(8).fill(null),
	5:Array(8).fill(null),
	6:Array(8).fill(null),
}
const notes = {
	1:['E','F','F#','G','G#','A','A#','B'],
	2:['B','C','C#','D','D#','E','F','F#'],
	3:['G','G#','A','A#','B','C','C#','D'],
	4:['D','D#','E','F','F#','G','G#','A'],
	5:['A','A#','B','C','C#','D','D#','E'],
	6:['E','F','F#','G','G#','A','A#','B'],
}

class Fret extends Component{

	render(){
		return(
			<div className = "fret" onClick={() => this.props.onClick()}>
			<div className = "circle">
				{ this.props.value }
			</div>
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
		var strings = this.state;
		const copystate = strings;
		for(var n=0;n< strings[s].length;n++){
			if(strings[s][k] !== strings[s][n]){
				strings[s][n] = null;
			}
		}
		if(copystate[s][k] === notes[s][k]){
			strings[s][k] = null;
		}else{
			strings[s][k] = notes[s][k];
		}
		
		this.setState({strings: strings})
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
