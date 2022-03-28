import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-test-renderer";

const scoreSlice = createSlice({
    name: 'score-info',
    initialState: {
        score: 0,
        name: ''
    },
    reducers: {
        setScore: (state, action) => {
            state.score = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        }
    }
});

export const { setScore, setName } = scoreSlice.actions;

export const selectScore = ({ score }) => score;

export default scoreSlice.reducer;