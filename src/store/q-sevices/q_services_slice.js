import { createSlice } from "@reduxjs/toolkit";


const defaultData = {};

const ServiceSlice = createSlice({
    name: "counterReducer",
    initialState: defaultData,
    reducers: {
        getDataPusher:{
            reducer:(state, action) =>{
                return action.payload;
            },
            prepare: () => {
                let payload;

                return {payload, type: 'counterReducer/getDataPusher'};
            }
        }
    }
});

export default ServiceSlice.reducer;
export const getDataPusher = ServiceSlice.actions;