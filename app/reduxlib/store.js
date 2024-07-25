// store.js
import { configureStore } from "@reduxjs/toolkit"
import dataReducer from "./reducer" // Import the reducer

// Configure the store
export const store = configureStore({
  reducer: {
    data: dataReducer, // Add the reducer to the store
  },
})
