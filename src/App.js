import React, { useEffect } from 'react'
import './App.scss'
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
import WatchListPage from './pages/profile/WatchListPage'
import SearchResults from './pages/SearchResults'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { loginSuccess, logout } from './redux/reducers/user/userSlice'
import './css/shared.scss'

function App() {
    // const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light')
    // const switchTheme = () => {
    //     const newTheme = theme === 'light' ? 'dark' : 'light'
    //     setTheme(newTheme)
    // }

    const userInformation = useSelector((store) => store.userInformation)
    const dispatch = useDispatch()

    useEffect(() => {
        function getUserInfo() {
            async function getUserInformationApiCall() {
                if (Object.keys(userInformation).length !== 0) {
                    const { username } = userInformation
                    try {
                        await axios.post(
                            `${process.env.REACT_APP_API_BASE_URL}/api/user/get-information`,
                            { username }
                        )
                        dispatch(loginSuccess())
                    } catch (e) {
                        dispatch(logout())
                    }
                }
            }
            getUserInformationApiCall()
        }
        getUserInfo()
    }, [])
    return (
        <Container fluid className="p-0">
            <NavigationBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignupPage />} />
                <Route path="/Media/:movieId" element={<MediaPage />} />
                <Route path="/:username" element={<ProfilePage />}>
                    <Route path="user-info" element={<UserInfoPage />} />
                    <Route path="following" element={<FollowingPage />} />
                    <Route
                        path="watch-history"
                        element={<WatchHistoryPage />}
                    />
                    <Route path="watchlist" element={<WatchListPage />} />
                </Route>
                <Route path="search/:searchQuery" element={<SearchResults />} />
            </Routes>
        </Container>
    )
}

export default App
