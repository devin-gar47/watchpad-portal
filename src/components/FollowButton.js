import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import LoadingButton from './LoadingButton'

function FollowButton({ followerUsername, followeeUsername }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const [error, setError] = useState('')
    const userInformation = useSelector((store) => store.userInformation)
    const navigate = useNavigate()

    async function isFollowingUser() {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/follower/is-following-user`,
                { followerUsername, followeeUsername }
            )
            setIsFollowing(data)
        } catch (e) {
            if (!e.response) {
                setError('Server is not running.')
                return
            }
            setError(e.response?.data)
        }
    }

    async function followUser() {
        setIsLoading(true)
        try {
            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/follower/follow`,
                { followerUsername, followeeUsername }
            )
            setIsFollowing(true)
            setIsLoading(false)
        } catch (e) {
            if (!e.response) {
                setError('Server is not running.')
                return
            }
            setError(e.response?.data)
            setIsLoading(false)
        }
    }

    async function unfollowUser() {
        setIsLoading(true)
        try {
            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/follower/unfollow`,
                { followerUsername, followeeUsername }
            )
            setIsFollowing(false)
            setIsLoading(false)
        } catch (e) {
            if (!e.response) {
                setError('Server is not running.')
                return
            }
            setError(e.response?.data)
            setIsLoading(false)
        }
    }

    function navigateToLoginPage() {
        navigate('/login')
    }

    useEffect(() => {
        isFollowingUser()
    }, [])

    return Object.keys(userInformation).length !== 0 ? (
        followerUsername !== followeeUsername ? (
            <>
                {!isFollowing ? (
                    <LoadingButton
                        button={
                            <Button
                                data-testid="follow-button"
                                variant="primary"
                                onClick={() => followUser()}
                            >
                                Follow
                            </Button>
                        }
                        isLoading={isLoading}
                        message="Attempting to follow user..."
                    />
                ) : (
                    <LoadingButton
                        button={
                            <Button
                                data-testid="unfollow-button"
                                variant="outline-primary"
                                onClick={() => unfollowUser()}
                            >
                                Following
                            </Button>
                        }
                        isLoading={isLoading}
                        message="Attempting to unfollow user..."
                    />
                )}
                <Alert
                    data-testid="error-alert"
                    variant="danger"
                    className="mt-2"
                    hidden={!error}
                >
                    {error}
                </Alert>
            </>
        ) : null
    ) : (
        <Button
            data-testid="login-button"
            variant="warning"
            onClick={navigateToLoginPage}
        >
            Login
        </Button>
    )
}

export default FollowButton
