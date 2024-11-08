import React from 'react';

import { View, StyleSheet, ViewStyle } from 'react-native';

import { useThemeColor } from './Themed';

interface SeparatorProps {
  style?: ViewStyle;
}

export function Separator({ style }: SeparatorProps) {
  const backgroundColor = useThemeColor({}, 'separator');

  return <View style={[styles.separator, { backgroundColor }, style]} />;
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
