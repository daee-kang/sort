import React from 'react';

export default Node = (props) => {
    let divStyle = {
        color: props.color,
        padding: '10px'
    }

    return (
        <span style = {divStyle}>
            {props.num}
        </span>
    )
}