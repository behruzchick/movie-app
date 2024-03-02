import React, { useState } from 'react'
import { Form, Navbar  } from 'react-bulma-components'
import './Header.css'

const Header = ({setSearch}) => {

    return (
        <Navbar className='navbar'>
            <Navbar.Brand>
                <Navbar.Item style={{color:"white"}} href='/'>
                    React Movie App
                </Navbar.Item>
            </Navbar.Brand>
            <Navbar className='navbar-menu'>
                <Form.Input onChange={(e) => setSearch(e.target.value)} className='form-input' placeholder='Movie name...'/>
            </Navbar>
        </Navbar>
    )
}

export default Header