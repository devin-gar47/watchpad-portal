import React from 'react'
import { Link } from 'react-router-dom'

function Followee({ username }) {
    return (
        <div>
            <Link to={`/${username}/user-info`}>{username}</Link>
        </div>
    )
}

export default Followee
