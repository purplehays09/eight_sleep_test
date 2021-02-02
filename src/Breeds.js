import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';

import DogCard from './DogCard';


export default function Breeds(props) {
    const {options,deviceNum,changeFavorites} = props
    const [breedDogs, setBreedDogs] = useState()

    const currentBreed = useParams().breed
    const currentSubreed = useParams().subreed

    useEffect(() => {
        setBreedDogs()
        axios.get(`https://dog.ceo/api/breed/${options.breed}/images/random/${deviceNum}`)
        .then(res => {
            setBreedDogs([res.data.message])
        })
        .catch(error => console.log(`GET breedDogs FAIL: ${error.message}`))
    },[currentBreed,currentSubreed])

    
    function moreDogs (){
        axios.get(`https://dog.ceo/api/breed/${options.breed}/images/random/${deviceNum}`)
        .then(res => {
            setBreedDogs([
                ...breedDogs,
                res.data.message
            ])
        })
        .catch(error => console.log(`GET breedDogs FAIL: ${error.message}`))
    }

    
    return (
        <div>
            <h1>Breeds</h1>

            <div className='cards'>
                {
                    breedDogs !== undefined &&
                    breedDogs.map(group => {
                        return group.map(dogBreed => {
                            return <DogCard pic={dogBreed} key={dogBreed} changeFavorites={changeFavorites}/>

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