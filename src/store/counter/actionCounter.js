import { createSlice } from "@reduxjs/toolkit";


const defaultData = {};

const CounterSlice = createSlice({
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

export default CounterSlice.reducer;
export const getDataPusher = CounterSlice.actions;