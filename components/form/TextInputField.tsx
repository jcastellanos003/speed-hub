import React from 'react';

import { TextInput, StyleSheet, TextInputProps } from 'react-native';

import { InputType } from '@/constants/types';

import { useThemeColor } from '../Themed';

interface TextInputFieldProps
  extends Omit<TextInputProps, 'secureTextEntry' | 'keyboardType'> {
  value: string;
  onChangeText: (text: string) => void;
  type?: InputType;
  variant?: 'default' | 'outlined' | 'filled';
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  value,
  placeholder,
  onChangeText,
  type = InputType.TEXT,
  variant = 'default',
  ...otherProps
}) => {
  // Theme-based colors
  const borderColor = useThemeColor({}, 'textInputBorder');
  const backgroundColor = useThemeColor({}, 'textInputBackground');
  const textColor = useThemeColor({}, 'text');
  const textColorPlaceholder = useThemeColor({}, 'textInputPlaceholder');

  // Configure type-specific properties
  const isPassword = type === InputType.PASSWORD;
  const keyboardType =
    type === InputType.EMAIL
      ? 'email-address'
      : type === InputType.PHONE
        ? 'phone-pad'
        : 'default';

  // Style adjustments based on variant
  const variantStyles = [
    variant === 'outlined' && styles.outlined,
    variant === 'filled' && { backgroundColor },
  ];

  return (
    <TextInput
      style={[
        styles.input,
        { borderColor, color: textColor },
        ...variantStyles,
      ]}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={textColorPlaceholder}
      onChangeText={onChangeText}
      secureTextEntry={isPassword}
      keyboardType={keyboardType}
      autoCapitalize="none"
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  outlined: {
    borderWidth: 1,
  },
});
