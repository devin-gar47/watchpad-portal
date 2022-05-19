import React from 'react'
import Followee from './Followee'

function FollowingList({ followingList }) {
    return followingList?.length > 0 ? (
        <>
            {followingList.map((user) => (
                <Followee username={user.username} />
            ))}
        </>
    ) : (
        <p>Not following anyone yet.</p>
    )
}

export default FollowingList
