// components/ThemedView.tsx
import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { View, ViewProps } from 'react-native';

export const ThemedView = (props: ViewProps) => {
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? '#000' : '#fff';

  return <View {...props} style={[{ backgroundColor: bgColor, flex: 1 }, props.style]} />;
};
