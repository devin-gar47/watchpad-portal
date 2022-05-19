import { combineReducers } from 'redux'
import userSlice from './reducers/user/userSlice'
import commentSlice from './reducers/comment/commentSlice'

const rootReducer = combineReducers({
    userInformation: userSlice,
    mediaComments: commentSlice,
})

export default rootReducer
