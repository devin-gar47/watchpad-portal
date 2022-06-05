import React from 'react'
import Menu from '../../components/Menu'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProfilePage() {
    const navigate = useNavigate()
    const userInformation = useSelector((store) => store.userInformation)
    const menuItems = [
        {
            label: 'USER INFO',
            link: '/user-info',
        },
        {
            label: 'FOLLOWING',
            link: '/following',
        },
        {
            label: 'WATCH HISTORY',
            link: '/watch-history',
        },
        {
            label: 'WATCHLIST',
            link: '/watchlist',
        },
    ]

    return (
        <div style={{ display: 'inline-flex', margin: '10px' }}>
            <div className="menu">
                <Menu items={menuItems} />
            </div>
            <Outlet />
        </div>
    )
}

export default ProfilePage
