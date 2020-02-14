import React from 'react';

const Bar = (props) => {
    let width = (window.innerWidth - window.innerWidth/4)/ props.size; 

    let divStyle = {
        backgroundColor: props.color,
        height: props.num * 5,
        width: width + 'px',
        display: 'inline-block'
    }

    return (
        <span style = {divStyle}>
        </span>
    )
}

export default Bar;