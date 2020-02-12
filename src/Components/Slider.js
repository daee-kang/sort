import React from 'react';

const Slider = (props) => {
    return (
        <div>
            <span>{props.label}</span>
            <input type="range" min={props.min} max={props.max} value={props.value} className="slider" onChange={props.handler}/>
        </div>
    )
}

export default Slider;