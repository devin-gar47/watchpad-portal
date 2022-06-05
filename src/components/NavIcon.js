import React from 'react'

function NavIcon({ icon, text }) {
    return (
        <div className="d-flex flex-column align-items-center nav-icon-container">
            <div>{icon}</div>
        </div>
    )
}

export default NavIcon
