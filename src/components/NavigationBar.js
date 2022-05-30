import React, { useState } from 'react'
import { Button, NavDropdown } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/reducers/user/userSlice'
import WatchPadLogo from '../static/watchpad_logo.png'

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
            expand="lg"
            className="px-2 d-flex justify-content-between"
            fixed="top"
        >
            <Navbar.Brand href="/" className="d-flex align-items-center">
                WatchPad
            </Navbar.Brand>
            {/* <div className="col-4">
                <div className="input-group">
                    <input
                        className="form-control border-secondary py-2"
                        type="search"
                        placeholder="search"
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e)}
                    />
                </div>
            </div> */}
            <Nav className="text-center">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href={`/${userInformation.username}`}>
                    Profile
                </Nav.Link>
                <Nav.Link href={`/${userInformation.username}/watchlist`}>
                    Watchlist
                </Nav.Link>
            </Nav>
            <Nav className="text-end">
                {!Object.keys(userInformation).length ? (
                    <>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <span>/</span>
                        <Nav.Link href="/sign-up">Sign Up</Nav.Link>
                    </>
                ) : (
                    <NavDropdown title={`Welcome ${userInformation.username}`}>
                        <NavDropdown.Item>
                            <Button onClick={() => handleLogout()}>
                                Logout
                            </Button>
                        </NavDropdown.Item>
                    </NavDropdown>
                )}
            </Nav>
        </Navbar>
    )
}

export default NavigationBar
