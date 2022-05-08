import React from 'react'
import Menu from '../../components/Menu'
import { Outlet } from 'react-router-dom'

function ProfilePage() {
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
