import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Followee from '../../components/Followee'
import FollowingList from '../../components/FollowingList'
import Loading from '../../components/Loading'

const FollowingPage = () => {
    const { username } = useParams()
    const [followingList, setFollowingList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function getFollowingList() {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/follower/get-following-list`,
                { followerUsername: username }
            )
            setFollowingList(data)
            setIsLoading(false)
        } catch (ex) {
            console.log(ex)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getFollowingList()
    }, [])

    return isLoading ? (
        <Loading message="Attempting to get followers..." />
    ) : (
        <FollowingList followingList={followingList} />
    )
}

export default FollowingPage
