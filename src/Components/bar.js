import React from 'react';

const Bar = (props) => {
    let divStyle = {
        backgroundColor: props.color,
        height: props.num * 6,
        width: '5px',
        display: 'inline-block'
    }

    return (
        <span style = {divStyle}>
        </span>
    )
}

export default Bar;