// to-do/src/components/button/Validate.tsx
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

interface ValidateProps {
  title: string;
  onPress: () => void;
}

const Validate: React.FC<ValidateProps> = ({ title, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPressed && styles.buttonPressed,
        Platform.OS === 'web' && styles.webHover,
      ]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00FFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 0.625, // 10px = 0.625rem
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      },
    }),
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
  },
  webHover: {
    // Web-specific hover styles (applied via :hover in browser)
    ':hover': {
      transform: [{ scale: 1.02 }],
      shadowOpacity: 0.4,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      shadowColor: '#000',
    },
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Validate;
