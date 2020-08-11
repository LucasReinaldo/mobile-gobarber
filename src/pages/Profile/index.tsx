import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../context/AuthContext';

import getInputValidation from '../../utils/getInputValidation';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  BackButton,
  Container,
  SignOutButton,
  SignOutButtonText,
  Title,
  UserAvatar,
  UserAvatarButton,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser, signOut } = useAuth();
  const { goBack } = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: ProfileFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .required('Email is required')
            .email('Please, type a valid e-mail'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Password is required'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Password is required'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert(
          'Profile update successfully.',
          'You can see your changes now! :)',
        );

        goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getInputValidation(err));
          return;
        }
        Alert.alert(
          'Update error.',
          'Please check your credentials or try again.',
        );
      }
    },
    [goBack, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Select your best picture',
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Open camera',
        chooseFromLibraryButtonTitle: 'Choose from library',
      },
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (response.error) {
          Alert.alert('ImagePicker Error.');
          return;
        }

        const data = new FormData();
        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpeg`,
          uri: response.uri,
        });

        api.patch('/users/avatar', data).then((apiResponse) => {
          updateUser(apiResponse.data);
        });
      },
    );
  }, [updateUser, user.id]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <BackButton onPress={navigateBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View>
              <Title>Profile</Title>
            </View>

            <Form
              initialData={{ name: user.name, email: user.email }}
              ref={formRef}
              onSubmit={handleSignUp}
            >
              <Input
                autoCapitalize="words"
                icon="user"
                name="name"
                placeholder="Name"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                icon="mail"
                keyboardType="email-address"
                name="email"
                placeholder="E-mail"
                ref={emailInputRef}
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />
              <Input
                icon="lock"
                name="old_password"
                placeholder="Old password"
                containerStyle={{ marginTop: 16 }}
                ref={oldPasswordInputRef}
                returnKeyType="next"
                secureTextEntry
                textContentType="password"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                icon="lock"
                name="password"
                placeholder="Password"
                ref={passwordInputRef}
                returnKeyType="next"
                secureTextEntry
                textContentType="newPassword"
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus();
                }}
              />
              <Input
                icon="lock"
                name="password_confirmation"
                placeholder="Password confirmation"
                ref={confirmPasswordInputRef}
                returnKeyType="send"
                secureTextEntry
                textContentType="password"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Submit
              </Button>
              <SignOutButton onPress={handleSignOut}>
                <Icon name="log-out" size={18} color="#ef3601" />
                <SignOutButtonText>Log out</SignOutButtonText>
              </SignOutButton>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
