import constants from './constants'


const findChord = (chord) => {
	var base_note = chord[0]

	// Remove duplicates
	let cleaned_chord = chord.filter((elem, index, self) => {
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
		val.push(constants.INTERVALS[sorted_val[s]]);
    }
	var str_val = val.toString();



	var my_val = constants.CHORDS[str_val];  //getKeyByValue(chords,str_val);
	if(my_val === undefined){
		my_val = '--';
	}

	return {
		'key': base_note,
		'chord':my_val,
	};
}

const findNotes = (chord) => {
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



export default {findChord, findNotes}