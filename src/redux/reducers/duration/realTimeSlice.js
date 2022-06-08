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

        myAddNewRealTimeComment: (state, action) => {
            const arr = [...state, action.payload]
            return arr.sort((a,b) => (parseInt(String(a.duration_timestamp))) < (parseInt(String(b.duration_timestamp))) ? 1:-1)
    },
}
})


export const { setRealTimeComments, myAddRealTimeComment, myAddNewRealTimeComment } =
    realTimeSlice.actions

export default realTimeSlice.reducer
