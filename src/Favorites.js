import React from 'react'

import DogCard from './DogCard';


export default function Favorites(props) {
    const {favorites} = props
    return (
        <div>
            <h1>Favorites</h1>

            <div className='cards'>
                {
                    favorites !== undefined &&
                    favorites.map(pic => {

                        return <DogCard pic={pic} key={pic} random="yes"/>

                    })
                }
            </div>
        </div>
    )
}