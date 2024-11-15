import React, { useState } from 'react';

import { View } from 'react-native';

import { SocialButton } from '@/components/auth/SocialButton';
import { PrimaryButton } from '@/components/form/Button';
import { TextInputField } from '@/components/form/TextInputField';
import { TextFieldLabel, Legend } from '@/components/Typography';
import { InputType } from '@/constants/types';

import { signInStyles } from './SignInForm.styles';

interface SignInFormProps {
  onGoogleAuth: () => void;
  onSignInWithEmailAndPassword: (email: string, password: string) => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  onGoogleAuth,
  onSignInWithEmailAndPassword,
}) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={signInStyles.content}>
      <Legend style={signInStyles.subtitle}>
        Welcome back! Please sign in to continue
      </Legend>
      <View style={signInStyles.socialButtons}>
        <SocialButton
          iconName="google"
          onPress={() => onSignInWithEmailAndPassword(emailAddress, password)}
        />
        <SocialButton iconName="apple" />
      </View>

      <TextFieldLabel>Email address</TextFieldLabel>
      <TextInputField
        value={emailAddress}
        onChangeText={setEmailAddress}
        placeholder="Enter your email"
        type={InputType.EMAIL}
        variant="outlined"
      />

      <TextFieldLabel>Password</TextFieldLabel>
      <TextInputField
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        type={InputType.PASSWORD}
        variant="outlined"
      />

      <View style={signInStyles.submitButton}>
        <PrimaryButton title="Continue" onPress={onGoogleAuth} />
      </View>
    </View>
  );
};
