import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { Link } from 'expo-router';

import React, { StyleSheet, TouchableOpacity } from 'react-native';

import { Separator } from '@/components/Separator';
import { Text, View } from '@/components/Themed';
import { api } from '@/convex/_generated/api';

// import { Redirect, Stack } from 'expo-router';

export default function HomeScreen() {
  const tasks = useQuery(api.models.tasks.get);
  const { user /* , isSignedIn */ } = useUser();
  const { signOut } = useAuth();

  /* if (isSignedIn) {
    return <Redirect href={'/'} />;
  } else {
    <Stack />;
  } */

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('error signing out', JSON.stringify(error, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Separator />
      <View>
        {tasks?.map(({ _id, text }) => <Text key={_id}>{text}</Text>)}
      </View>
      <Separator />
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <Link href="/auth/sign-in">
        <Text>Sign In</Text>
      </Link>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <SignedOut>
        <Link href="/auth/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/signup">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
