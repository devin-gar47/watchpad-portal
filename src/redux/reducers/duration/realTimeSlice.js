import { createSlice } from '@reduxjs/toolkit'

export const realTimeSlice = createSlice({
    name: 'Real Time Comments',
    initialState: [],
    reducers: {
        setRealTimeComments: (state, action) => {
            return action.payload
        },
        myAddRealTimeComment: (state, action) => {
            const arr = [...state, action.payload]
            return arr
        },
    },
})

export const { setRealTimeComments, myAddRealTimeComment } =
    realTimeSlice.actions

export default realTimeSlice.reducer
