import {createSlice} from '@reduxjs/toolkit'

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        page: 0,
        visibleQuestion: [],
        limit: 4,
        allPages : 0
    },

    reducers: {
        updatePageAndQuestions: (state, action) => {
            state.page = action.payload
            const skipCount = state.page * state.limit

            const arr = []

            const allQuestions = JSON.parse(localStorage.getItem('questions')) || []

            for (let i = skipCount; i < allQuestions.length; i++) {
                if (i >= allQuestions.length) break
                arr.push(allQuestions[i])
            }


            state.visibleQuestion = arr.slice(0,4)
        },

        updateAllPages : (state , action)=>{
            state.allPages = Math.ceil(action.payload)
        },

        visibilityUpdate : (state , action)=>{
            state.visibleQuestion = action.payload
        }
    },

})

export const {updatePageAndQuestions , updateAllPages , visibilityUpdate} = dashboardSlice.actions

export default dashboardSlice.reducer