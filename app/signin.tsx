import React, { useState, useCallback, FC } from 'react';

import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';

import { View, StyleSheet } from 'react-native';

import {
  PrimaryButton,
  ButtonWithIcon,
  FontAwesomeIconNames,
} from '@/components/form/Button';
import { TextInputField } from '@/components/form/TextInputField';
import { Separator } from '@/components/Separator';
import { SafeAreaView, useThemeColor } from '@/components/Themed';
import {
  HyperlinkText,
  Legend,
  TextFieldLabel,
  Title,
} from '@/components/Typography';
import { InputType } from '@/constants/types';

const SocialButton: FC<{ iconName: FontAwesomeIconNames }> = ({ iconName }) => {
  const iconColor =
    iconName === 'google'
      ? '#4285F4'
      : iconName === 'apple'
        ? '#000000'
        : '#000';

  return (
    <View style={styles.socialButton}>
      <ButtonWithIcon
        iconName={iconName}
        type="outlined"
        size={18}
        color={iconColor}
      />
    </View>
  );
};

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const footerBackgroundColor = useThemeColor({}, 'footerBackground');

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, signIn, emailAddress, password, setActive, router]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Title style={styles.title}>Sign in to Speed Hub</Title>
        <Legend style={styles.subtitle}>
          Welcome back! Please sign in to continue
        </Legend>

        <View style={styles.socialButtons}>
          <SocialButton iconName="google" />
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

        <View style={styles.submitButton}>
          <PrimaryButton title="Continue" onPress={onSignInPress} />
        </View>
      </View>
      <Separator />
      <View
        style={[
          styles.bottomContainer,
          { backgroundColor: footerBackgroundColor },
        ]}
      >
        <Legend style={styles.footerText}>Don’t have an account?</Legend>
        <Link href="/signup">
          <HyperlinkText onPress={() => router.push('/signup')}>
            Sign up
          </HyperlinkText>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 25,
  },
  bottomContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 40,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  footerText: {
    marginTop: 20,
    marginRight: 10,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    paddingBottom: 20,
  },
  submitButton: {
    marginTop: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  socialButton: {
    width: 110,
  },
});
