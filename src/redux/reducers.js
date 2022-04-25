import { combineReducers } from 'redux'
import userSlice from './reducers/user/userSlice'

const rootReducer = combineReducers({
    userInformation: userSlice,
})

export default rootReducer
