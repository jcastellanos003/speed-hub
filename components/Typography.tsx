import React from 'react';

import { Text as DefaultText, StyleSheet, TextProps } from 'react-native';

import { useThemeColor } from './Themed';

interface TextComponentProps extends TextProps {
  children: React.ReactNode;
}

export const Title: React.FC<TextComponentProps> = ({
  children,
  style,
  ...otherProps
}) => {
  const color = useThemeColor({}, 'title');
  return (
    <DefaultText style={[styles.title, { color }, style]} {...otherProps}>
      {children}
    </DefaultText>
  );
};

export const Legend: React.FC<TextComponentProps> = ({
  children,
  style,
  ...otherProps
}) => {
  const color = useThemeColor({}, 'legend');
  return (
    <DefaultText style={[styles.legend, { color }, style]} {...otherProps}>
      {children}
    </DefaultText>
  );
};

export const TextFieldLabel: React.FC<TextComponentProps> = ({
  children,
  style,
  ...otherProps
}) => {
  const color = useThemeColor({}, 'fieldLabel');
  return (
    <DefaultText style={[styles.fieldLabel, { color }, style]} {...otherProps}>
      {children}
    </DefaultText>
  );
};

interface HyperlinkTextProps extends TextProps {
  children: React.ReactNode;
  onPress: () => void;
}

export const HyperlinkText: React.FC<HyperlinkTextProps> = ({
  children,
  onPress,
  style,
  ...otherProps
}) => {
  const color = useThemeColor({}, 'hyperlink');
  return (
    <DefaultText
      style={[styles.hyperlink, { color }, style]}
      onPress={onPress}
      {...otherProps}
    >
      {children}
    </DefaultText>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legend: {
    fontSize: 14,
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  hyperlink: {
    fontWeight: 'bold',
  },
});
