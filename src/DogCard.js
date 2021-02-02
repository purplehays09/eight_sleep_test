import React from "react";


export default function DogCard(props) {
    const {pic, changeFavorites} = props
    const breed = pic.split('/')
    

    return (
        <div className='dogCard' value={pic} >
            {
                props.random &&
            <h4>{breed[4]}</h4>
            }
            <img src={pic} alt="random dog" onClick={changeFavorites}/>
        </div>
    )
}