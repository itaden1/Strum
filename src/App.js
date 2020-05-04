import React, { Component } from 'react';
import github from './github-mark-light.png';

// modules
import IntervalNote from './modules/IntervalNote'
import GuitarFretBoard from './modules/GuitarFretBoard'
import GuitarStrings from './modules/GuitarStrings'
import Fret from './modules/Fret'

// lib
import constants from './lib/constants'
import chordFunctions from './lib/chordFunctions'

// css 
import './App.css';


class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			strings: constants.STRINGS,
			notes: Array(12).fill('\u00A0'),
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
		if(copystate[s][k] === constants.NOTES[s][k]){
			strings[s][k] = null;
		}else{
			strings[s][k] = constants.NOTES[s][k];
			
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
		var new_chord = chordFunctions.findChord(chord)
		var new_notes = chordFunctions.findNotes(chord)

		this.setState({
			strings: strings,
			chord: new_chord,
			notes: new_notes,
		})
	}
	
	renderIntervals(){
		const interval_ref = constants.INTERVALS;
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
				onClickCallback = {() => this.addNote(value,key,i)}
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
					<div className="container-lrg">
						<h1 className="App-title">Strum</h1>
						<h2 className="App-titletwo">The Guitar Chord App</h2>
					</div>
				</header>
				<div className="App-body">
				<div className = "container">
					<p>Select notes on the virtual fretboard and discover a chords name and interval structure.<br/> Chord names are based on lowest note being the root note.</p>
					
					<div className = "guitar">
						<GuitarFretBoard />
						<div className = "boxes">
							{Object.keys(this.state.strings).map((i) => {
								return <div key={i} className="string">{this.renderString(i)}</div>
							})}
						</div>
					</div>
				</div>
				<div className = "container">
					<div className="row chord-info">
						<div className = "chord_name column-4">
							<h3><span>{this.state.chord.key}</span>{this.state.chord.chord}</h3>
						</div>
						<div className = "intervals column-6">
							<h4>Chord Structure</h4>
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
				<div className="footer container-lrg">
					<p><a href="https://github.com/itaden1/strum"><img src={github}/></a><br/><a href="https://ethanshearer.com" target="blank">&#169; Ethan Shearer 2018</a></p>
				</div>
			</div>
		);
	}
}	

export default App;
