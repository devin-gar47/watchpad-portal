import React from 'react'
import './App.css'
import Container from 'react-bootstrap/Container'
import NavigationBar from './components/NavigationBar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MediaPage from './pages/MediaPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/profile/ProfilePage'
import UserInfoPage from './pages/profile/UserInfoPage'
import FollowingPage from './pages/profile/FollowingPage'
import WatchHistoryPage from './pages/profile/WatchHistoryPage'

function App() {
    return (
        <Container fluid className="p-0">
            <NavigationBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignupPage />} />
                <Route path="/Media/:movieId" element={<MediaPage />} />
                <Route path="profile" element={<ProfilePage />}>
                    <Route path="user-info" element={<UserInfoPage />} />
                    <Route path="following" element={<FollowingPage />} />
                    <Route path="watch-history" element={<WatchHistoryPage />} />
                </Route>
            </Routes>
        </Container>
    )
}

export default App
