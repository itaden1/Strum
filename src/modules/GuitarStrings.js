import React from 'react'
import Fret from './Fret'


const GuitarStrings = ({strings, clickCallback}) => {

    const renderString = (i) => {
        const string = strings[i]
        const notes = string.map( (value, key) => 
            <Fret 
                key = {key}
                value = {value}
                strIndex={i}
                onClickCallback = {() => clickCallback()}
            />
        );
        return (
            <span>{notes}</span>
        );
    }
    return (
        <div className = "boxes">
            <div className = "string">
                {renderString(1)}
            </div>
            <div className = "string">
                {renderString(2)}
            </div>
            <div className = "string">
                {renderString(3)}
            </div>
            <div className = "string">
                {renderString(4)}
            </div>
            <div className = "string">
                {renderString(5)}
            </div>
            <div className = "string">
                {renderString(6)}
            </div>
        </div>
    )
}

export default GuitarStrings
