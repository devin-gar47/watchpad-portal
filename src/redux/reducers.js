import { combineReducers } from 'redux'
import userSlice from './reducers/user/userSlice'
import commentSlice from './reducers/comment/commentSlice'
import durationSlice from './reducers/duration/durationSlice'

const rootReducer = combineReducers({
    userInformation: userSlice,
    mediaComments: commentSlice,
    durationComments: durationSlice,
})

export default rootReducer
