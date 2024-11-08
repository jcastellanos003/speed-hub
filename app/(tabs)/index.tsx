import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { Link } from 'expo-router';

import React, { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Separator } from '@/components/Separator';
import { Text, View } from '@/components/Themed';
import { api } from '@/convex/_generated/api';

// import { Redirect, Stack } from 'expo-router';

export default function TabOneScreen() {
  const tasks = useQuery(api.tasks.get);
  const { user /* , isSignedIn */ } = useUser();

  /* if (isSignedIn) {
    return <Redirect href={'/'} />;
  } else {
    <Stack />;
  } */

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Separator />
      <View>
        {tasks?.map(({ _id, text }) => <Text key={_id}>{text}</Text>)}
      </View>
      <Separator />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <Link href="/signin">
        <Text>Sign In</Text>
      </Link>
      <SignedOut>
        <Link href="/signin">
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
