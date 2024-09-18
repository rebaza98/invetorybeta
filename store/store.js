import { configureStore } from "@reduxjs/toolkit";
import { personaSlice } from "./slices/core/persona/personaSlice";

export default configureStore({
    reducer: {
        personaValores: personaSlice.reducer,
    }
})