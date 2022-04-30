import { createSlice } from '@reduxjs/toolkit'
import { clone } from 'ramda'

export const userSlice = createSlice({
    name: 'User Information',
    initialState: {},
    reducers: {
        loginSuccess: (state, action) => {
            const newObj = clone(state)
            newObj.isLoggedIn = true
            return Object.assign(newObj, action.payload)
        },
    },
})

export const { loginSuccess } = userSlice.actions

export default userSlice.reducer
