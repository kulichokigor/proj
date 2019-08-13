import React from 'react';
import './menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faTimes, } from '@fortawesome/free-solid-svg-icons'

const Menu = props =>{
    
    const nameCls = [
        'menu',
    ]
    const openMenu = props.open
    const verb = (openMenu)=>{
        let nameIcon
        if(openMenu===true){
            nameIcon = faTimes;
            nameCls.push('open')
        }else{
            nameIcon = faBars
        }
        return nameIcon
    }

    return(

        <FontAwesomeIcon
            icon={verb(openMenu)}
            className={nameCls.join(' ')}
            onClick={props.menuClick}
        />
    )
}

export default Menu