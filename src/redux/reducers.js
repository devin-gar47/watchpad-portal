import { combineReducers } from 'redux'
import userSlice from './reducers/user/userSlice'
import commentSlice from './reducers/comment/commentSlice'
import watchlistSlice from './reducers/watchlist/watchlistSlice'

const rootReducer = combineReducers({
    userInformation: userSlice,
    mediaComments: commentSlice,
    watchlistEntries: watchlistSlice,
})

export default rootReducer
