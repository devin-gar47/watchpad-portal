import { Button } from 'react-bootstrap'
import React from 'react'

function AddWatchlist() {
    return (
        <div>
            <Button variant="success">Add To WatchList</Button>
            <Button className="btnSpacing" variant="success">
                Remove From WatchList
            </Button>
        </div>
    )
}

export default AddWatchlist
