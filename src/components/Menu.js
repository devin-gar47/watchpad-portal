import React from 'react'
import './Menu.css'

function MenuItem({ item }) {
    return (
        <div className='menu_item' 
            onClick={() => console.log('Clicked ' + item.text)}>
            { item.text }
        </div>
    )
}

const Menu = ({menuItems}) => {
    const menu = menuItems.map(item => {
        return(
            <div key={item.text}>
                <MenuItem item={ item } />
            </div>
        )
    })
    
    return (
        <div className='menu_container'>
            { menu }
        </div>
    )
}

export default Menu
