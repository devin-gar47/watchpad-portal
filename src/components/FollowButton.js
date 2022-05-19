import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

function FollowButton({ followerUsername, followeeUsername }) {
    const [isFollowing, setIsFollowing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function isFollowingUser() {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/follower/is-following-user`,
                { followerUsername, followeeUsername }
            )
            setIsFollowing(data)
        } catch (ex) {
            console.log(ex)
        }
    }

    async function followUser() {
        try {
            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/follower/follow`,
                { followerUsername, followeeUsername }
            )
            setIsFollowing(true)
        } catch (ex) {
            console.log(ex)
        }
    }

    async function unfollowUser() {
        try {
            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/follower/unfollow`,
                { followerUsername, followeeUsername }
            )
            setIsFollowing(false)
        } catch (ex) {
            console.log(ex)
        }
    }

    useEffect(() => {
        isFollowingUser()
    }, [])

    return followerUsername !== followeeUsername && !isFollowing ? (
        <Button variant="primary" onClick={() => followUser()}>
            Follow
        </Button>
    ) : (
        <Button variant="outline-primary" onClick={() => unfollowUser()}>
            Following
        </Button>
    )
}

export default FollowButton
