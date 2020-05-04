import React from 'react'


const Fret = ({value, onClickCallback}) => {
    return(
        <div className = "fret" onClick={onClickCallback}>
            <div className = "circle">
                { value }
            </div>
        </div>
    )
}

export default Fret
