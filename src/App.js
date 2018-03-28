import React, { Component } from 'react';
import guitar from './guitar.png';
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
	1:['E','F','F\u266F','G','G\u266F','A','A\u266F','B','C','C\u266F','D','D\u266F','E','F'],
	2:['B','C','C\u266F','D','D\u266F','E','F','F\u266F','G','G\u266F','A','A\u266F','B','C'],
	3:['G','G\u266F','A','A\u266F','B','C','C\u266F','D','D\u266F','E','F','F\u266F','G','G\u266F'],
	4:['D','D\u266F','E','F','F\u266F','G','G\u266F','A','A\u266F','B','C','C\u266F','D','D\u266F'],
	5:['A','A\u266F','B','C','C\u266F','D','D\u266F','E','F','F\u266F','G','G\u266F','A','A\u266F'],
	6:['E','F','F\u266F','G','G\u266F','A','A\u266F','B','C','C\u266F','D','D\u266F','E','F'],
}

const intervals = ['I','\u266DII','II','\u266DIII','III','IV','\u266DV','V','\u266DVI','VI','\u266DVII','VII']

//for mapping interval combinations to chord extension
const chords = {
	'I,V': 					'5',
	'I,III,V': 				'Maj',
	'I,III,IV,V': 			'add4',
	'I,III,V,VI': 			'6',
	'I,II,III,V,VI': 		'6/9',
	'I,III,V,VII': 			'Maj7',
	'I,II,III,V,VII': 		'Maj9',
	'I,II,III,IV,V,VII': 	'Maj11',
	'I,III,IV,V,VII': 		'Maj11',
	'I,II,III,IV,V,VI,VII': 'Maj13',
	'I,III,IV,V,VI,VII': 	'Maj13',
	'I,II,IV,V,VI,VII': 	'Maj13',
	'I,III,V,VI,VII': 		'Maj13',
	'I,III,\u266DV,V,VII': 		'Maj7\u266F11',
	'I,III,\u266DV': 			'Maj\u266D5',
	'I,\u266DIII,V': 			'm',
	'I,\u266DIII,IV,V': 			'madd4',
	'I,\u266DIII,V,VI':  		'm6',
	'I,\u266DIII,V,\u266DVII': 		'm7',
	'I,II,\u266DIII,V': 			'madd9',
	'I,II,\u266DIII,V,VI': 		'm6/9',
	'I,II,\u266DIII,V,\u266DVII': 	'm9',
	'I,II,IV,\u266DIII,V,\u266DVII': 	'm11',
	'I,IV,\u266DIII,V,\u266DVII': 	'm11',
	'I,II,\u266DIII,IV,V,VI,\u266DVII':'m13',
	'I,\u266DIII,IV,V,VI,\u266DVII': 	'm13',
	'I,II,\u266DIII,V,VI,\u266DVII': 	'm13',
	'I,\u266DIII,V,VI,\u266DVII': 	'm13',
	'I,\u266DIII,V,VII': 		'm/Maj7',
	'I,II,\u266DIII,V,VII': 		'm/Maj9',
	'I,II,\u266DIII,IV,V,VII': 	'm/Maj11',
	'I,\u266DIII,IV,V,VII': 		'm/Maj11',
	'I,II,\u266DIII,IV,V,VI,VII':'m/Maj13',
	'I,\u266DIII,IV,V,VI,VII': 	'm/Maj13',
	'I,II,\u266DIII,V,VI,VII': 	'm/Maj13',
	'I,\u266DIII,V,VI,VII': 		'm/Maj13',
	'I,III,V,\u266DVII': 		'7',
	'I,\u266DIII,\u266DV': 			'Dim',
	'I,\u266DIII,\u266DV,VI': 		'Dim7',
	'I,\u266DIII,\u266DV,\u266DVII': 		'\u00F8', //half diminished 7 or m7b5
	'I,III,\u266DVI,\u266DVII': 		'7\u266F5',
	'I,III,V,\u266DVII,II': 		'9',
	'I,III,V,\u266DVII,\u266DIII': 	'7\u266F9',
	'I,III,V,II': 			'add9',
	'I,III,V,\u266DVII,\u266DV': 		'7\u266F11',
	'I,VI,V': 				'sus4',
	'I,II,V': 				'sus2',
}


function findChord(chord){
	var base_note = chord[0]

	//Remove duplicates
	let cleaned_chord = chord.filter(function(elem, index, self){
		return index === self.indexOf(elem);	
	});

	//shift notes so that base note is on position 0
	var note_ref = ['A','A\u266F','B','C','C\u266F','D','D\u266F','E','F','F\u266F','G','G\u266F']
	var len = note_ref.indexOf(base_note);
	for(var i = 0; i < len; i++){
		note_ref.push(note_ref.shift());

	}
	
	//get values of chord notes
	var val = [];
    var interval_val = [];
	for(var n = 0; n < cleaned_chord.length; n++){
        var index = note_ref.indexOf(cleaned_chord[n]);
	//	val.push(intervals[index]);
        interval_val.push(index);
	}
	var sorted_val = interval_val.sort(function(a,b){return a - b;});
    for(var s = 0; s < sorted_val.length; s++){
        console.log(sorted_val[s]);
		val.push(intervals[sorted_val[s]]);
    }
	var str_val = val.toString();
    console.log('str val'+str_val);
    console.log(interval_val);


	var my_val = chords[str_val];  //getKeyByValue(chords,str_val);
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
	var note_ref = ['A','A\u266F','B','C','C\u266F','D','D\u266F','E','F','F\u266F','G','G\u266F'];
	var len = note_ref.indexOf(base_note);
	for(var i = 0; i < len; i++){
		note_ref.push(note_ref.shift());
	}
	
	var played_notes = Array(note_ref.length).fill('\u00A0');
	for (var x = 0; x < note_ref.length; x++){
		for(var y = 0; y < chord.length; y++){
			if(chord[y] === note_ref[x]){
				played_notes[x] = note_ref[x];
			}
		}
	}
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
            <div className="container-lrg">
                <img src={guitar} alt="guitar"/>
			    <h1 className="App-title">Strum</h1>
            </div>
		</header>
		<div className="App-body">
		<div className = "container">
			<h2>Learn Guitar Chords with Strum</h2>
			<p>Select notes on the virtual fretboard and discover a chords name and interval structure.</p>
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
					<div className = "fret-dot" id="third">
					</div>
					<div className = "fret-dot" id="fifth">
					</div>
					<div className = "fret-dot" id="seventh">
					</div>
					<div className = "fret-dot" id="ninth">
					</div>
					<div className = "fret-dot" id="twelve-one">
					</div>
					<div className = "fret-dot" id="twelve-two">
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
		<div className = "container negative-margin">
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
			<p>&#169; Ethan Shearer 2018</p>
		</div>
	</div>
);
}
}

export default App;
