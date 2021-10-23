import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Follower } from "./follow";

interface UserRequest {
    address: string
}

interface UserResponse {
    id: string;
    address: string;
    message: string;
    name: string;
    birthDate: string;
    registrationDate: string;
    lastLoginDate: string;
    profileImageUrl: string;
    bannerImageUrl: string;
    bio: string;
    isFollowing: boolean;
    following: Follower[];
}

interface UploadProfileImageRequest {
    name: string,
    image: string,
    type: string
}

interface UploadProfileImageResponse {
    message: string,
    url: string
}

interface EditProfileResponse {
    message: string,
}
interface EditProfileRequest {
    oldName: string,
    newName?: string,
    bio?: string,
    profileImageUrl?: string,
    bannerImageUrl?: string
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, UserRequest>({
            query: ({ address }) => ({
                url: `user/${address}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }),
        }),
        uploadProfileImage: builder.mutation<UploadProfileImageResponse, UploadProfileImageRequest>({
            query: ({ name, image, type }) => ({
                url: `user/upload-profile-image`,
                method: "POST",
                body: {
                    name,
                    image,
                    type
                }
            }),
        }),
        editProfile: builder.mutation<EditProfileResponse, EditProfileRequest>({
            query: ({ oldName, newName, bio, profileImageUrl, bannerImageUrl }) => ({
                url: `user/edit/${oldName}`,
                method: "POST",
                body: {
                    newName,
                    bio,
                    profileImageUrl,
                    bannerImageUrl
                }
            }),
        }),
    }),
});

export const { useGetUserQuery, useUploadProfileImageMutation, useEditProfileMutation } = userApi;