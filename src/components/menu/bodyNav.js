import React from 'react';
import './menu.css'
import {NavLink} from 'react-router-dom';



export default (props) =>{
    const nameCls = [
        'body-nav'
    ]
    if(!props.open){
        nameCls.push('close')
    }
    return(
        <div className={nameCls.join(' ')}>
            <ul>
                <li><NavLink style={{textDecoration:'none', color:'black', fontSize:'40px'}} to="/">Play</NavLink></li>
                <li><NavLink style={{textDecoration:'none', color:'black', fontSize:'40px'}} to="/rule">Правила</NavLink></li>
            </ul>
        </div>
    )
}