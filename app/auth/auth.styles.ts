import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
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
});
