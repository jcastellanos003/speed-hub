import { useCallback } from 'react';

import { useOAuth, useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export const useSpeedHubAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const onSignInWithEmailAndPassword = useCallback(
    async (email: string, password: string) => {
      if (!isLoaded) {
        return;
      }

      try {
        const signInAttempt = await signIn.create({
          identifier: email,
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
    },
    [isLoaded, signIn, setActive, router]
  );

  const onGoogleAuth = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
        router.replace('/');
      } else {
        if (signIn) {
          // Handle sign in
          console.log('user signed in thru google');
        } else if (signUp) {
          // Handle sign up
          console.log('user signed up thru google');
        }
      }
    } catch (error) {
      console.error('OAuth error', JSON.stringify(error, null, 2));
    }
  }, [startOAuthFlow, router]);

  return {
    onSignInWithEmailAndPassword,
    onGoogleAuth,
  };
};
