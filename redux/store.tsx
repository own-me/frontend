import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { loginApi } from "./api/login"
import userReducer from "./slices/user";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [loginApi.reducerPath]: loginApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        loginApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;