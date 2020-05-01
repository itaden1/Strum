
// Data
// Representation of guitar strings and fret
const STRINGS = {
	1:Array(14).fill(null),
	2:Array(14).fill(null),
	3:Array(14).fill(null),
	4:Array(14).fill(null),
	5:Array(14).fill(null),
	6:Array(14).fill(null),
}

// Notes as represented on the fretboard of a guitar with standard tuning
const NOTES = {
	1:['E','F','F\u266F','G','G\u266F','A','A\u266F','B','C','C\u266F','D','D\u266F','E','F'],
	2:['B','C','C\u266F','D','D\u266F','E','F','F\u266F','G','G\u266F','A','A\u266F','B','C'],
	3:['G','G\u266F','A','A\u266F','B','C','C\u266F','D','D\u266F','E','F','F\u266F','G','G\u266F'],
	4:['D','D\u266F','E','F','F\u266F','G','G\u266F','A','A\u266F','B','C','C\u266F','D','D\u266F'],
	5:['A','A\u266F','B','C','C\u266F','D','D\u266F','E','F','F\u266F','G','G\u266F','A','A\u266F'],
	6:['E','F','F\u266F','G','G\u266F','A','A\u266F','B','C','C\u266F','D','D\u266F','E','F'],
}

// Interval names
const INTERVALS = ['I','\u266DII','II','\u266DIII','III','IV','\u266DV','V','\u266DVI','VI','\u266DVII','VII']

// for mapping interval combinations to chord extension
const CHORDS = {
	'I,V': 							'5',
	'I,III,V': 						'Maj',
	'I,III,IV,V': 					'add4',
	'I,III,V,VI': 					'6',
	'I,II,III,V,VI': 				'6/9',
	'I,III,V,VII': 					'Maj7',
	'I,II,III,V,VII': 				'Maj9',
	'I,II,III,IV,V,VII': 			'Maj11',
	'I,III,IV,V,VII': 				'Maj11',
	'I,II,III,IV,V,VI,VII': 		'Maj13',
	'I,III,IV,V,VI,VII': 			'Maj13',
	'I,II,IV,V,VI,VII': 			'Maj13',
	'I,III,V,VI,VII': 				'Maj13',
	'I,III,\u266DV,V,VII': 			'Maj7\u266F11',
	'I,III,\u266DV': 				'Maj\u266D5',
	'I,\u266DIII,V': 				'm',
	'I,\u266DIII,IV,V': 			'madd4',
	'I,\u266DIII,V,VI':  			'm6',
	'I,\u266DIII,V,\u266DVII': 		'm7',
	'I,II,\u266DIII,V': 			'madd9',
	'I,II,\u266DIII,V,VI': 			'm6/9',
	'I,II,\u266DIII,V,\u266DVII': 	'm9',
	'I,II,IV,\u266DIII,V,\u266DVII':'m11',
	'I,IV,\u266DIII,V,\u266DVII': 	'm11',
	'I,II,\u266DIII,IV,V,VI,\u266DVII':'m13',
	'I,\u266DIII,IV,V,VI,\u266DVII':'m13',
	'I,II,\u266DIII,V,VI,\u266DVII':'m13',
	'I,\u266DIII,V,VI,\u266DVII': 	'm13',
	'I,\u266DIII,V,VII': 			'm/Maj7',
	'I,II,\u266DIII,V,VII': 		'm/Maj9',
	'I,II,\u266DIII,IV,V,VII': 		'm/Maj11',
	'I,\u266DIII,IV,V,VII': 		'm/Maj11',
	'I,II,\u266DIII,IV,V,VI,VII': 	'm/Maj13',
	'I,\u266DIII,IV,V,VI,VII': 		'm/Maj13',
	'I,II,\u266DIII,V,VI,VII': 		'm/Maj13',
	'I,\u266DIII,V,VI,VII': 		'm/Maj13',
	'I,III,V,\u266DVII': 			'7',
	'I,\u266DIII,\u266DV': 			'Dim',
	'I,\u266DIII,\u266DV,VI': 		'Dim7',
	'I,\u266DIII,\u266DV,\u266DVII':'\u00F8', //half diminished 7 or m7b5
	'I,III,\u266DVI,\u266DVII': 	'7\u266F5',
	'I,III,V,\u266DVII,II': 		'9',
	'I,III,V,\u266DVII,\u266DIII': 	'7\u266F9',
	'I,III,V,II': 					'add9',
	'I,III,V,\u266DVII,\u266DV': 	'7\u266F11',
	'I,VI,V': 						'sus4',
	'I,II,V': 						'sus2',
}

export default{STRINGS, NOTES, INTERVALS, CHORDS}
