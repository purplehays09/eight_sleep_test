import React from 'react'

import RandomDogs from './RandomDogs'


export default function Dashboard(props) {

    
    return (
        <div>
            <h1>Dashboard</h1>
            <RandomDogs deviceNum={props.deviceNum} changeFavorites={props.changeFavorites}/>     

        </div>
    )
}