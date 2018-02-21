import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


// Data
//Representation of guitar strings and fret
const strings = {
	1:Array(14).fill(null),
	2:Array(14).fill(null),
	3:Array(14).fill(null),
	4:Array(14).fill(null),
	5:Array(14).fill(null),
	6:Array(14).fill(null),
}

//For mapping strings / frets to notes
const notes = {
	1:['E','F','F#','G','G#','A','A#','B','C','C#','D','D#','E','F'],
	2:['B','C','C#','D','D#','E','F','F#','G','G#','A','A#','B','C'],
	3:['G','G#','A','A#','B','C','C#','D','D#','E','F','F#','G','G#'],
	4:['D','D#','E','F','F#','G','G#','A','A#','B','C','C#','D','D#'],
	5:['A','A#','B','C','C#','D','D#','E','F','F#','G','G#','A','A#'],
	6:['E','F','F#','G','G#','A','A#','B','C','C#','D','D#','E','F'],
}

const intervals = ['I','bII','II','bIII','III','IV','bV','V','bVI','VI','bVII','VII']

//for mapping interval combinations to chord extension
const chords = {
	'5':                  '0,7',
	'Maj':                '0,4,7',
	'Maj 6':              '0,4,7,9',
	'6 add 9':      	  '0,2,4,7,9',
	'Maj 7':              '0,4,7,11',
	'Maj 9':           	  '0,2,4,7,11',
	'Min 9': 			  '0,2,3,7,10',
	'Dom 7':              '0,4,7,10',
	'Dom 7 b10':      	  '0,3,4,7,10',
	'Dom 7 aug 5':        '0,4,6,10',
	'Dom 7 sus 4':        '0,5,7,10',
	'Dom 9':              '0,2,4,7,10',
	'Dom 9 sus 4':        '0,2,5,7',
	'Dom 11':             '0,2,4,5,7,10',
	//'Dom 13':             '0,3,5,7,9,10', not technically possible on guitar
	'Aug':                '0,4,8',
	'min':                '0,3,7',      
	'min 6':              '0,3,7,9',
	'min 7':              '0,3,7,10',
	'min 7 b5':     	  '0,3,6,10',
	'Dim':                '0,3,6',
	'Dim 7':              '0,3,6,9',
	'Sus 4':              '0,5,7',
	'Sus 2':              '0,2,7',
	'Add 9':              '0,4,7,14',
}

//Helper functions

function getKeyByValue(object, value){
	return Object.keys(object).find(key => object[key] === value);
}

function findChord(chord){
	var base_note = chord[0]

	//Remove duplicates
	let cleaned_chord = chord.filter(function(elem, index, self){
		return index === self.indexOf(elem);	
	});

	//shift notes so that base note is on position 0
	var note_ref = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#']
	var len = note_ref.indexOf(base_note);
	for(var i = 0; i < len; i++){
		note_ref.push(note_ref.shift());

	}
	
	//get values of chord notes
	var val = [];
	for(var n=0; n<cleaned_chord.length;n++){
		val.push(note_ref.indexOf(cleaned_chord[n]))
		
	}
	var sorted_val = val.sort(function(a,b){return a - b;});
	var str_val = sorted_val.toString();


	var my_val = getKeyByValue(chords,str_val);
	if(my_val === undefined){
		my_val = '--';
	}

	return {
		'key': base_note,
		'chord':my_val,
	};
}

function findNotes(chord){
	const base_note = chord[0];
	var note_ref = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
	console.log(intervals);
	var len = note_ref.indexOf(base_note);
	for(var i = 0; i < len; i++){
		note_ref.push(note_ref.shift());
	}
	
	var played_notes = Array(note_ref.length).fill(' ');
	for (var x = 0; x < note_ref.length; x++){
		for(var y = 0; y < chord.length; y++){
			if(chord[y] === note_ref[x]){
				played_notes[x] = note_ref[x];
			}
		}
	}
	console.log(played_notes)
	return played_notes
}

class IntervalNote extends Component{
	
	render(){
		return(
			<td>{this.props.value}</td>
		)
	}
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
		this.state = {
			strings: strings,
			notes: [],
			chord: {
				'key': '',
				'chord':'--'
			}
		};
	}
	addNote(v, k, s){
		var strings = this.state.strings;
		

		//Copy the selected notes then
		//remove all notes from selected string
		const copystate = strings;
		for(var n=0;n< strings[s].length;n++){
			if(strings[s][k] !== strings[s][n]){
				strings[s][n] = null;
			}
		}
		//Check if note was already selected remove it if so, otherwise add it
		if(copystate[s][k] === notes[s][k]){
			strings[s][k] = null;
		}else{
			strings[s][k] = notes[s][k];
			
		}

		//Make an array of all selected notes
		var chord = []
		var len = Object.keys(strings).length
		for(var i=1; i <= len; i++){
			for(var x=0;x < strings[i].length; x++){
				if(strings[i][x] != null){
					chord.push(strings[i][x]);
					chord.reverse();
				}
			}
		}
		//Find current chord
		var new_chord = findChord(chord)
		var new_notes = findNotes(chord)

		this.setState({
			strings: strings,
			chord: new_chord,
			notes: new_notes,
		})
	}
	
	renderIntervals(){
		const interval_ref = intervals;
		var interval_table = interval_ref.map( (value, key) => 
			<IntervalNote
				key = {key}
				value = {value}
			/>
		);
		return interval_table;
	}

	renderIntervalNote(){
		const notes = this.state.notes
		var interval_table = notes.map( (value, key) =>
			<IntervalNote
				key = {key}
				value = {value}
			/>
		); 
			
		return interval_table
	}

	renderString(i){
		const string = this.state.strings[i]
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
		<div className="container">
			<img src={logo} className="App-logo" alt="logo" />
			<h1 className="App-title">Strum</h1>
		</div>
		</header>
		<div className="App-body">
		<div className = "container">
			<h2>Welcome to Strum</h2>
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
		<div className = "container">
			<div className="row chord-info">
				<div className = "chord_name column-4">
					<h4>Chord Name</h4>
					<h3><span>{this.state.chord.key}</span> {this.state.chord.chord}</h3>
				</div>
				<div className = "intervals column-6">
					<h4>Chord Make Up</h4>
					<table>
						<tbody>
							<tr>
								{this.renderIntervals()}
							</tr>
							<tr>
								{this.renderIntervalNote()}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		</div>
	</div>
);
}
}

export default App;
