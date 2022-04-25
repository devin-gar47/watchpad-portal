import { createSlice } from '@reduxjs/toolkit'
import { clone } from 'ramda'

export const userSlice = createSlice({
    name: 'User Information',
    initialState: { isLoggedIn: false },
    reducers: {
        login: (state) => {
            const newObj = clone(state)
            newObj.isLoggedIn = true
            return newObj
        },
    },
})

export const { login } = userSlice.actions

export default userSlice.reducer
