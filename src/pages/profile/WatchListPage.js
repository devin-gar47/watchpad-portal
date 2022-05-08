import React from 'react'
import Row from '../../components/Row'
import requests from '../../requests'

const WatchListPage = () => {
    //const watchList = useSelector((store) => store.watchList)

    return (
        /*
        <div style={{ margin: '10px' }}>
            <div>
                <h3>Watchlist</h3>
            </div>
            <div>
                {watchList.map((movie) => (
                    <div key={movie.id}>
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>
        </div>
        */
        
        
        <div style={{ margin: '10px' }}>
            <div>
                <Row title="WATCHLIST" fetchUrl={requests.fetchPopular} />
            </div>
        </div>
    )
}

export default WatchListPage