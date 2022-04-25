import React from 'react'
import './App.css'
import Container from 'react-bootstrap/Container'
import NavigationBar from './components/NavigationBar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
    return (
        <Container fluid className="p-0">
            <NavigationBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Container>
    )
}

export default App
