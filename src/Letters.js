import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';

import DogCard from './DogCard';


export default function Letter(props) {
    const {breeds,options,deviceNum, changeFavorites} = props
    const [alphaGroup, setAlphaGroup] = useState()

    const currentLetter = useParams().letter

    useEffect(() => {
        setAlphaGroup()
        const list = breeds.filter(breed => breed[0] === options.alpha)
        const tempList = []

        for (let i=0;i<deviceNum;i++){
            let rando = Math.floor(Math.random() * list.length);
            axios.get(`https://dog.ceo/api/breed/${list[rando]}/images/random`)
            .then(res => {
                tempList.push(res.data.message)
            })
            .catch(error => console.log(error.message))
        }
        setTimeout(function(){
            setAlphaGroup([tempList])


        }, 1500); 

    },[currentLetter])
    
    function moreDogs (){
        const list = breeds.filter(breed => breed[0] === options.alpha)
        console.log('list',list)
        const tempList = []

        for (let i=0;i<20;i++){
            let rando = Math.floor(Math.random() * list.length);
            axios.get(`https://dog.ceo/api/breed/${list[rando]}/images/random`)
            .then(res => {
                tempList.push(res.data.message)
            })
            .catch(error => console.log(error.message))
        }
        setTimeout(function(){
            setAlphaGroup([...alphaGroup,tempList])


        }, 1500); 
    }

    
    return (
        <div>
            <h1>Letter</h1>

            <div className='cards'>
                {
                    alphaGroup !== undefined &&
                    alphaGroup.map(group => {
                        return group.map(dogBreed => {
                            return <DogCard pic={dogBreed} key={dogBreed} changeFavorites={changeFavorites} random="yes"/>

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