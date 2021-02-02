import React, { useState, useEffect } from 'react'
import axios from "axios";

import DogCard from './DogCard'


export default function RandomDogs({deviceNum,changeFavorites}) {
    const [setBreeds] = useState(['hello'])
    let [randoms, setRandoms] = useState()

    useEffect(() => {
        axios.get('https://dog.ceo/api/breeds/list/all')
        .then(res => {
            setBreeds(Object.keys(res.data.message))
        })
        .catch(error => console.log(error))
        

    }, [])
    
    useEffect(() => {
        axios.get(`https://dog.ceo/api/breeds/image/random/${deviceNum}`)
        .then(res => {
            setTimeout(function(){
                setRandoms([res.data.message])
            }, 1000);
        })
        .catch(error => console.log(`GET RANDOMS FAIL: ${error.message}`))
        
    },[])
    
    function moreDogs (){
        axios.get(`https://dog.ceo/api/breeds/image/random/${deviceNum}`)
        .then(res => {
            setRandoms([
                ...randoms,
                res.data.message
            ])
        })
        .catch(error => console.log(`GET RANDOMS FAIL: ${error.message}`))
    }
    return (
        <div>
            <h1>Random Dogs</h1>
            <div className='cards'>
                {
                    // breeds.map(breed => <DogCard breed={breed}/>)
                    randoms !== undefined &&
                    randoms.map(group => {
                        return group.map(rand => {
                            return <DogCard pic={rand} key={rand} changeFavorites={changeFavorites} random='yes'/>

                        })
                    })
                }

            </div>
            <button onClick={moreDogs}>
                More Dogs
            </button>
        </div>
    )
}