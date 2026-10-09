import { configureStore } from "@reduxjs/toolkit";
import questionSlice from '../../features/Question/state/questionState'
import dashboardSlice from '../../features/Dashboard/state/dashboardState'
export const store = configureStore({
    reducer : {
        questionSlice : questionSlice,
        dashboardSlice : dashboardSlice
    }
})