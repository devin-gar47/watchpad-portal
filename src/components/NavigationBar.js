import React, { useState } from 'react'
import { Button, NavDropdown } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/reducers/user/userSlice'

function NavigationBar() {
    const userInformation = useSelector((store) => store.userInformation)
    const [textInput, setTextInput] = useState('')
    const dispatch = useDispatch()
    let navigate = useNavigate()

    function handleLogout() {
        dispatch(logout())
        navigate('/')
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            let path = `/search/${textInput}`
            navigate(path)
        }
    }

    return (
        <Navbar
            bg="light"
            expand="lg"
            className="px-2 flex-shrink-0 align-items-center"
            fixed="top"
        >
            <Navbar.Brand href="/">WatchPad</Navbar.Brand>
            <div className="col-4">
                <div className="input-group">
                    <input
                        className="form-control border-secondary py-2"
                        type="search"
                        placeholder="search"
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e)}
                    />
                </div>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href={`/${userInformation.username}`}>
                        Profile
                    </Nav.Link>
                    <Nav.Link href={`/${userInformation.username}/watchlist`}>
                        Watchlist
                    </Nav.Link>
                </Nav>
                <Nav className="align-items-center">
                    {!Object.keys(userInformation).length ? (
                        <>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <span>/</span>
                            <Nav.Link href="/sign-up">Sign Up</Nav.Link>
                        </>
                    ) : (
                        <NavDropdown
                            title={`Welcome ${userInformation.username}`}
                        >
                            <NavDropdown.Item>
                                <Button onClick={() => handleLogout()}>
                                    Logout
                                </Button>
                            </NavDropdown.Item>
                        </NavDropdown>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar
