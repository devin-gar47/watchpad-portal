import React from 'react'
import Menu from '../components/Menu'
import { useSelector } from 'react-redux'

// import Row from '../components/Row'
// import requests from '../requests'

function ProfilePage() {
    const userInformation = useSelector((store) => store.userInformation)

    const items = [
        { text: 'USER INFO' },
        { text: 'FAVORITES' },
        { text: 'MY WATCHLIST' },
      ]
    
    // const testUserFavorites = [
    //     { id: '629542'},
    //     { id: '568124'},
    //     { id: '676705'},
    //     { id: '675353'},
    //     { id: '696806'}
    // ]

    return (
        <div style={{ display: "inline-flex", margin: "10px"}}>
            <div className="menu">
            <Menu menuItems={items}/>
            </div>
            <div style={{ margin: "10px"}}>
                {!Object.keys(userInformation).length ? (
                        <>
   
                        </>
                    ) : (
                        <div>
                            <div>
                                <h3>Username: {userInformation.username}</h3>
                            </div>
                            <div>
                                <h3>Email: {userInformation.email}</h3>
                            </div> 
                        </div> 
                        )}

                {/* <Row title="MY WATCHLIST" fetchUrl={requests.fetchPopular} /> */}
            
            </div>
        </div>
    )
}

export default ProfilePage