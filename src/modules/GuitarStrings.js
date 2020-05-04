import React from 'react'

import Fret from './Fret'

const GuitarStrings = ({strings, callback}) => {

    const renderString = (stringIndex) => {
        const notes = strings[stringIndex].map( (value, fretIndex) => 
            <Fret 
                key = {fretIndex}
                value = {value}
                onClickCallback = {() => callback(fretIndex, stringIndex)}
            />
		);
		return (
			<span key={stringIndex}>{notes}</span>
		);
    }
    return (
        <div className = "boxes">
            {Object.keys(strings).map((s) => renderString(s))}
        </div>
    )
}

export default GuitarStrings