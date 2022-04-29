import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function NavigationBar() {
    return (
        <Navbar bg="light" expand="lg" className="px-2">
            <Navbar.Brand href="/">WatchPad</Navbar.Brand>
            <div class="col-4">
                <div class="input-group">
                    <input
                        class="form-control border-secondary py-2"
                        type="search"
                        placeholder="search"
                    />
                </div>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/media">Media</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/something">Something Else</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar
