import React, { ComponentProps } from 'react';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

import { useThemeColor } from '../Themed';

export type FontAwesomeIconNames = ComponentProps<typeof FontAwesome>['name'];

interface ButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

interface ButtonWithIconProps extends ButtonProps {
  iconName?: FontAwesomeIconNames;
  size?: number;
  color?: string;
  type?: 'default' | 'outlined';
}

export const PrimaryButton: React.FC<ButtonProps> = ({ title, onPress }) => {
  const backgroundColor = useThemeColor({}, 'primaryButton');
  const textColor = useThemeColor({}, 'buttonText');

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  iconName,
  size = 25,
  color,
  title,
  onPress,
  type = 'default',
}) => {
  const backgroundColor = useThemeColor({}, 'primaryButton');
  const textColor = useThemeColor({}, 'buttonText');
  const outlineColor = useThemeColor({}, 'buttonOutline');
  const defaultIconColor = useThemeColor({}, 'iconColor');

  const iconColor =
    color || (type === 'outlined' ? defaultIconColor : defaultIconColor);

  const containerStyles = [
    styles.buttonWithIcon,
    type === 'default' && { backgroundColor },
    type === 'outlined' && { borderColor: outlineColor, borderWidth: 1 },
  ];

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      <FontAwesome
        name={iconName}
        size={size}
        color={iconColor}
        style={styles.icon}
      />
      {title && (
        <Text
          style={[
            styles.buttonText,
            { color: type === 'outlined' ? outlineColor : textColor },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  buttonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  icon: {
    opacity: 1,
  },
});
