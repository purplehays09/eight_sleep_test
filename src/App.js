import React, { useState, useEffect } from 'react'
import './App.css';
import { Link, Route, Switch } from 'react-router-dom'
import axios from "axios";
import {isMobile} from 'react-device-detect'
import { Button, FormGroup, Input } from 'reactstrap';


import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import Breeds from "./Breeds";
import Subreeds from "./Subreeds";
import Letter from "./Letter";
import Favorites from "./Favorites";


// Navbar
// home
// favorites

// Dashboard
// Fetch random dogs. 
// Display 20 dog cards
// Find 20 more cards button

// Breeds
// Fetch dog breeds
// Display 20 dog cards
// Find 20 more cards button

// Sub-breeds
// Fetch all subreeds
// Display 20 dog cards
// Find 20 more cards button

// A-Z
// Sort existing breeds by letter
// make a random funciton that will select a breed with the corresponding letter
// Display 20 dog cards
// Find 20 more cards button

// Dog Card
// Dog img
// Dog breed name
// add favorite on click

// favorites
// show favorite options


// styling if I have time



function App() {
  // this should set up the basic query to 10 if the device is mobile and 20 if it is desktop
  const [deviceNum,setDeviceNum] = useState(isMobile)
  const [breeds, setBreeds] = useState(['hello'])
  const [subreeds, setSubreeds] = useState([])
  const [alpha, setAlpha] = useState([])
  const [favorites,setFavorites] = useState([])
  const [options, setOptions] = useState({
    breed:'',
    subreed:'',
    alpha:''
  })


  useEffect(() => {
      axios.get('https://dog.ceo/api/breeds/list/all')
      .then(res => {
          setBreeds(Object.keys(res.data.message))
      })
      .catch(error => console.log(error))
      if (isMobile){
        setDeviceNum(10)
      }else{
        setDeviceNum(20)
      }
    }, [])
    useEffect(() => {
      const alphaList = []
      breeds.forEach(breed => {
        const letter = breed[0]
        if(alphaList.includes(letter)){
        }else {
          alphaList.push(letter)
        }
      })
      setAlpha(alphaList)
      
  },[breeds])

  useEffect(() => {
      setSubreeds([])
      setOptions({
          ...options,
          subreed:''
      })
      console.log(subreeds)
      axios.get(`https://dog.ceo/api/breed/${options.breed}/list`)
      .then(res => {
          setSubreeds(res.data.message)
      })
  }, [options.breed])

  function handleInputChange(event) {
      const {name, value} = event.target
      if (name === 'alpha'){
          setOptions({
            alpha:value,
            breed:'',
            subreed:'',
          })
      } else{
        setOptions({
            ...options,
            [name]: value,
            alpha:'',
        });

      }
  }
  function changeFavorites(event){
    console.log('changeFavorites',event.target.src)
    if(favorites.includes(event.target.src)){
      setFavorites(favorites.filter(favorite => { 
        return favorite !== event.target.src 
        })
      )
    }else{
      setFavorites([...favorites,event.target.src])
    }
  }
  return (
    <div className="App">
      

      <NavBar />

      <FormGroup id='form'>
          <Input type='select' name='alpha' onChange={handleInputChange}>
              <option value=''>Select a Letter</option>
              {
                  alpha.map(letter => {
                      return <option value={letter} key={letter}>{letter}</option>
                  })
              }
          </Input>
           <h4>-- OR --</h4>
          <Input type='select' name='breed' onChange={handleInputChange}>
              <option>Select a Breed</option>
              {
                  breeds.map(breed => {
                      return <option value={breed} key={breed}>{breed}</option>
                  })
              }
          </Input>

          {
              subreeds.length > 1 &&
              <Input type='select' name='subreed' onChange={handleInputChange}>
                      <option>Select a Subreed</option>
                  {
                      subreeds.map(subreed => {
                          return <option value={subreed} key={subreed}>{subreed}</option>
                      })
                  }
                  </Input>
          }
        </FormGroup>
      {
          options.alpha !== ''?
              <Link to={`/alpha/${options.alpha}`}>
                  <Button>Submit</Button>
              </Link>:
          options.subreed === '' ?
              <Link to={`/${options.breed}`}>
                  <Button>Submit</Button>
              </Link> :
              <Link to={`/${options.breed}/${options.subreed}`}>
                  <Button>Submit</Button>
              </Link> 
      }


      <Switch>
        <Route exact path='/'>
          <Dashboard
            deviceNum={deviceNum}
            changeFavorites={changeFavorites}
            />
        </Route>

        <Route exact path='/favorites'>
          <Favorites 
            favorites={favorites}
            changeFavorites={changeFavorites}
            />
        </Route>
        <Route exact path='/:breed'>
          <Breeds 
            deviceNum={deviceNum}
            options={options}
            changeFavorites={changeFavorites}
            />
        </Route>
        <Route exact path='/alpha/:letter'>
          <Letter 
            deviceNum={deviceNum}
            breeds={breeds}
            options={options}
            changeFavorites={changeFavorites}
            />
        </Route>

        <Route exact path='/:breed/:subreed'>
          <Subreeds 
            deviceNum={deviceNum}
            options={options}
            changeFavorites={changeFavorites}
            />
        </Route>


      </Switch>

      {/* had to add the more dogs button to the individual pages since all the calls are different */}
        <footer>
          <h4>Dogs Site</h4>
        </footer>
    </div>
  );
}

export default App;
