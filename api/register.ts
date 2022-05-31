import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RegisterRequest {
    address: string;
    isAgeConfirmed: boolean;
}

export const registerApi = createApi({
    reducerPath: "registerApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.IS_DEV === "true" ? "http://localhost:3000/" : "https://api.ownme.io/" }),
    endpoints: (builder) => ({
        postRegister: builder.mutation<{ message: string }, RegisterRequest>({
            query: ({ address, isAgeConfirmed }) => ({
                url: "auth/register/",
                method: "POST",
                body: {
                    address,
                    isAgeConfirmed
                }
            })
        }),
        verifyEmail: builder.mutation<{ email: string }, { email: string }>({
            query: ({ email }) => ({
                url: "register/verify-email",
                method: "POST",
                body: {
                    email
                }
            })
        }),
    }),
});

export const { usePostRegisterMutation, useVerifyEmailMutation } = registerApi;