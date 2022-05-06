import React from 'react'
import './App.css'
import Container from 'react-bootstrap/Container'
import NavigationBar from './components/NavigationBar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MediaPage from './pages/MediaPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'


function App() {
    return (
        <Container fluid className="p-0">
            <NavigationBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignupPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/Media/:movieId" element={<MediaPage />} />
            </Routes>
        </Container>
    )
}

export default App
