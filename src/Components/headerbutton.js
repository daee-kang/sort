import React from 'react';

const HeaderButton = (props) => {
    let style = {
        display: 'inline-block',
        padding: '20px',
        backgroundColor: 'white',
        color: 'black',
        border: 'solid 1px black',
        borderTopStyle: 'none',
        width: '80px'
    }

    if(props.selected){
        style.backgroundColor = 'black';
        style.color = 'white';
    }

    return(
        <div style={style} onClick={(e) => props.onclick(e)}>
            {props.sort}
        </div>
    )
}

export default HeaderButton;