import { configureStore } from "@reduxjs/toolkit";
import counterReducer, { increment } from "./features/counter";
import authReducer from './features/auth'
// import userReducer from './features/song'
import songReducer from './features/song'
//lưu trữ các state
const store = configureStore({
  reducer: {
    // counter: counterReducer,
    auth: authReducer,
    // user: userReducer,
    song: songReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



export default store;
