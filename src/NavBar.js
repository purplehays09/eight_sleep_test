import React from 'react'
import {
    Navbar,
    NavLink,
    NavbarText
  } from 'reactstrap';
import {Link} from 'react-router-dom'



export default function NavBar() {
    return (
        <Navbar id='navbar'>
            <h2>Dogs Site</h2>
            <div id='navLinks'>
                <NavLink className='nav'>
                    <Link to='/'>
                        <NavbarText>
                            Home
                        </NavbarText>
                    </Link>
                </NavLink>
                <NavLink className='nav'>
                    <Link to='/favorites'>
                        <NavbarText>
                            My Dogs
                        </NavbarText>
                    </Link>
                </NavLink>
            </div>
        </Navbar>
    )
}