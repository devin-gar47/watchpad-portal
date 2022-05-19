import React from 'react'
import { useParams } from 'react-router-dom'
import './Menu.css'

function MenuItem({ item }) {
    const { username } = useParams()

    return (
        <div
            className="menu_item"
            onClick={() => {
                console.log('Clicked ' + item.link)
                window.location.pathname = `${username}` + item.link
            }}
        >
            {item.label}
        </div>
    )
}

const Menu = ({ items }) => {
    return (
        <div className="menu_container">
            {items.map((item) => {
                return (
                    <div key={item.label}>
                        <MenuItem item={item} />
                    </div>
                )
            })}
        </div>
    )
}

export default Menu
