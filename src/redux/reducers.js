import { combineReducers } from 'redux'
import userSlice from './reducers/user/userSlice'
import commentSlice from './reducers/comment/commentSlice'
import durationSlice from './reducers/duration/durationSlice'
import realTimeSlice from './reducers/duration/realTimeSlice'
import watchlistSlice from './reducers/watchlist/watchlistSlice'

const rootReducer = combineReducers({
    userInformation: userSlice,
    mediaComments: commentSlice,
    durationComments: durationSlice,
    watchlistEntries: watchlistSlice,
    realTimeComments: realTimeSlice
})

export default rootReducer
