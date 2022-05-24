import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import FollowButton from '../../components/FollowButton'
import Loading from '../../components/Loading'

const UserInfoPage = () => {
    const { username } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})
    const userInformation = useSelector((store) => store.userInformation)

    async function getUserInformation() {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/user/get-information`,
                { username }
            )
            setData(data)
            setIsLoading(false)
        } catch (ex) {
            console.log(ex)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUserInformation()
    }, [])

    return isLoading ? (
        <Loading message="Gathering data" />
    ) : (
        <div style={{ margin: '10px' }} data-testid="user-info-container">
            <h3 data-testid="user-info-username">Username: {data.username}</h3>
            <h3 data-testid="user-info-email">Email: {data.email}</h3>
            <FollowButton
                followerUsername={userInformation?.username}
                followeeUsername={data?.username}
            />
        </div>
    )
}

export default UserInfoPage
