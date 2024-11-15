import React from 'react';

import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

import { View } from 'react-native';

import { SignInForm } from '@/components/auth';
import { Separator } from '@/components/Separator';
import { SafeAreaView, useThemeColor } from '@/components/Themed';
import { HyperlinkText, Legend, Title } from '@/components/Typography';
import { useSpeedHubAuth } from '@/hooks/useAuth';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';

import { authStyles } from './auth.styles';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  useWarmUpBrowser();
  const router = useRouter();
  const footerBackgroundColor = useThemeColor({}, 'footerBackground');
  const { onSignInWithEmailAndPassword, onGoogleAuth } = useSpeedHubAuth();

  return (
    <SafeAreaView style={authStyles.container} edges={['top', 'left', 'right']}>
      <Title style={authStyles.title}>Sign in to Speed Hub</Title>

      <SignInForm
        onGoogleAuth={onGoogleAuth}
        onSignInWithEmailAndPassword={onSignInWithEmailAndPassword}
      />
      <Separator />
      <View
        style={[
          authStyles.bottomContainer,
          { backgroundColor: footerBackgroundColor },
        ]}
      >
        <Legend style={authStyles.footerText}>Don’t have an account?</Legend>
        <Link href="/signup">
          <HyperlinkText onPress={() => router.push('/signup')}>
            Sign up
          </HyperlinkText>
        </Link>
      </View>
    </SafeAreaView>
  );
}
