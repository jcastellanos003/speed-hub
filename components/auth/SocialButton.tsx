import React, { FC } from 'react';

import { View, StyleSheet, GestureResponderEvent } from 'react-native';

import { ButtonWithIcon, FontAwesomeIconNames } from '@/components/form/Button';
import { useThemeColor } from '@/components/Themed';

interface SocialButtonProps {
  iconName: FontAwesomeIconNames;
  color?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export const SocialButton: FC<SocialButtonProps> = ({
  iconName,
  color,
  onPress,
}) => {
  const appleColor = useThemeColor({}, 'appleColor');
  const iconColor =
    (color ?? iconName === 'google')
      ? '#4285F4'
      : iconName === 'apple'
        ? appleColor
        : '#000';

  return (
    <View style={styles.socialButtonContainer}>
      <ButtonWithIcon
        iconName={iconName}
        type="outlined"
        size={18}
        color={iconColor}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  socialButtonContainer: {
    width: 110,
  },
});
