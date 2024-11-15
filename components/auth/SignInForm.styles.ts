import { StyleSheet } from 'react-native';

export const signInStyles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 25,
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
});
