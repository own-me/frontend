import React, { memo, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import FormInput from "../../components/FormInput";
import FormTextArea from "../../components/FormTextArea";
import { useEditUserMutation, useUploadProfileImageMutation } from "../../redux/api/user";
import { useNavigate } from "react-router-dom";
import FormFileInputButton from "../../components/FormFileInputButton";

const EditProfileFormContainer = styled.div`

`;

const Header = styled.h1`
    font-family: "Poppins", sans-serif;
    padding: 0px 40px 20px 40px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 0px;
`;

const BannerImage = styled.img`
    width: 100%;
    height: 180px;
`;

const ProfileImageContainer = styled.div`
    width: 150px;
    height: 150px;
    position: absolute;
    left: calc(50% - 75px);
    top: 160px;
`; 

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 5px solid white;
    background: white;
`;

const EditProfileImageButton = styled(FormFileInputButton)`

`;

const EditBannerButton = styled(FormFileInputButton)`

`;

const InputContainer = styled.div`
    margin-top: 60px;
    padding: 0px 40px;
    height: 305px;
    overflow-y: auto;
`;

const Footer = styled.div`
    float: right;
    padding: 0px 40px 40px 0px;
`;

const Button = styled.button<{ $isDisabled?: boolean }>`
    font-family: Poppins,Open Sans;
    font-size: 22px;
    background-color: #FF81EB;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 6px;
    margin-left: 50px;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    cursor: pointer;

    ${props => props.$isDisabled && css`
        opacity: 0.5;
        cursor: not-allowed;
    `}
`;

const SaveButton = styled(Button) <{ $isDisabled?: boolean }>`
    width: 200px;
    margin-left: 30px;

    ${props => !props.$isDisabled && css`
        :hover {
            background-color: #ff31de;
        }
    `}
`;

const CancelButton = styled(Button) <{ $isDisabled?: boolean }>`
    background-color: #71A1FF;
    width: 130px;

    ${props => !props.$isDisabled && css`
        :hover {
            background-color: #2c73ff;
        }
    `}
`;

const CustomInput = styled(FormInput)`
    color: red !important;
`;

interface EditProfileFormProps {
    address: string;
    bannerImage: string;
    profileImageUrl: string;
    currentName: string;
    currentBio: string;
    onCancel: () => void;
    userRefetch: () => void;
}

const EditProfileForm = memo(({ address, bannerImage, profileImageUrl, currentName, currentBio, onCancel, userRefetch }: EditProfileFormProps) => {
    const [name, setName] = useState<string>(currentName ?? "");
    const [bio, setBio] = useState<string>(currentBio ?? "");
    const [profileImagePreview, setProfileImagePreview] = useState<string>(null);
    const [profileImageFile, setProfileImageFile] = useState<File>(null);

    const navigate = useNavigate();

    const [postEditUser, {
        isSuccess: isEditUserSuccess,
    }] = useEditUserMutation();

    const handleSave = async () => {
        if (profileImageFile) {
            const formData = new FormData();
            formData.append("image", profileImageFile);
            const ipfsResponse = await uploadProfileImage({ address, formData });
            console.log(ipfsResponse);
        }
        await postEditUser({
            address,
            name,
            bio
        });
    };

    useEffect(() => {
        if (isEditUserSuccess) {
            onCancel();
            navigate(`/${address}`);
            userRefetch();
        }
    }, [address, isEditUserSuccess, navigate, onCancel, userRefetch]);

    const [uploadProfileImage] = useUploadProfileImageMutation();

    return (
        <EditProfileFormContainer>
            <Header>Edit Profile</Header>
            <BannerImage src={bannerImage} />
            <EditBannerButton onFile={(file) => console.log("save banner!", file)}>Edit Banner</EditBannerButton>
            <ProfileImageContainer>
                <ProfileImage src={profileImagePreview || profileImageUrl} />
                <EditProfileImageButton
                    onData={(data) => setProfileImagePreview(data)}
                    onFile={(file) => setProfileImageFile(file)}
                >
                    Edit Profile Image
                </EditProfileImageButton>
            </ProfileImageContainer>
            <InputContainer>
                <CustomInput
                    type="text"
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    errorMessage="Name is required."
                    placeholder="What should people call you?"
                    inputValue={currentName}
                />
                <FormTextArea
                    label="Bio"
                    onChange={(value) => setBio(value)}
                    errorMessage="Bio is required."
                    placeHolder="Tell the world about yourself and everything you have to offer :)"
                    inputValue={currentBio}
                />
            </InputContainer>
            <Footer>
                <CancelButton onClick={onCancel}>Cancel</CancelButton>
                <SaveButton onClick={handleSave} $isDisabled={!name || !bio}>Save</SaveButton>
            </Footer>
        </EditProfileFormContainer>
    );
});

export default EditProfileForm;