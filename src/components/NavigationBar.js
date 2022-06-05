import React, { useEffect, useState } from 'react'
import { Button, NavDropdown } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/reducers/user/userSlice'
import NavIcon from './NavIcon'
import { AiFillHome } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { BiMoviePlay } from 'react-icons/bi'
import '../css/NavigationBar.scss'

function NavigationBar() {
    const userInformation = useSelector((store) => store.userInformation)
    const [showBackground, setShowBackground] = useState(false)
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

    function showNavbarBackgroundColor() {
        if (window.scrollY > 35) {
            setShowBackground(true)
        } else {
            setShowBackground(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', showNavbarBackgroundColor)
        return () =>
            window.removeEventListener('scroll', showNavbarBackgroundColor)
    }, [])

    return (
        <Navbar
            expand="lg"
            className={`px-2 d-flex justify-content-between ${
                showBackground && 'nav-background'
            }`}
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
            <Nav className="d-flex text-center">
                <Nav.Link href="/">
                    <NavIcon icon={<AiFillHome size={25} />} text="Home" />
                </Nav.Link>
                <Nav.Link href={`/${userInformation.username}`}>
                    <NavIcon
                        icon={<BsFillPersonFill size={25} />}
                        text="Profile"
                    />
                </Nav.Link>
                <Nav.Link href={`/${userInformation.username}/watchlist`}>
                    <NavIcon
                        icon={<BiMoviePlay size={25} />}
                        text="Watchlist"
                    />
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
