import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from '../features/scoreSlice';

export default configureStore({
    reducer: {
        score: scoreReducer,
    }
});