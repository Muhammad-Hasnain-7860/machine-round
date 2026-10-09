import {createSlice} from '@reduxjs/toolkit'

const questionSlice = createSlice({
    name : 'question',
    initialState : {
        allQuestions : [],
        update : null
    },

    reducers : {
        questionUpdate : (state , action)=>{
            state.allQuestions = action.payload
        },

        update: (state , action)=>{
            state.update = action.payload
        }
    }
})

export const {questionUpdate , update} = questionSlice.actions

export default questionSlice.reducer