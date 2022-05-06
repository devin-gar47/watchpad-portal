import React from 'react'
import { useSelector } from 'react-redux'

const UserInfoPage = () => {

    const userInformation = useSelector((store) => store.userInformation)

    return (
        <div style={{margin: "10px"}}>
            <div>
                <h3>Username: {userInformation.username}</h3>
            </div>
            <div>
                <h3>Email: {userInformation.email}</h3>
            </div> 
        </div> 
    )
}

export default UserInfoPage