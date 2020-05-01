import React from 'react'

const GuitarFretBoard = () => {
    
    const frets = () => {
        let f = []
        for (var i = 0; i < 12; i++){
            f.push(            
            <div key={i} className = "fret-graphic">
            </div>
            )
        }
        return f
    }

    const strings = () => {
        let s = []
        for (var i = 1; i <= 6; i++){
            s.push(
                <div key={i} className = "str-graphic">
                </div>
            )
        }
        return s
    }

    return (
        <div className = "graphics">
            {frets()}
            {strings()}
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
        </div>
    )
}

export default GuitarFretBoard