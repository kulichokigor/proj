import React from 'react';


export default (props)=>{
    return(
        <button
          onClick={props.onClick}
          // disabled={props.player}
          id={props.id}
          className="dots"
          style={{ background: props.color, top: props.top * 50, left: props.left * 50, opacity: props.opacity }}
          disabled={props.disab}
        ></button>
    )
}