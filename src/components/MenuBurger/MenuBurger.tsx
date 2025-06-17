// to-do/src/components/MenuBurger/MenuBurger.tsx
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Link } from 'expo-router';

const MenuBurger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-1000)).current; // Start off-screen

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    Animated.timing(slideAnim, {
      toValue: isOpen ? -1000 : 0, // Slide in or out
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <TouchableOpacity style={styles.iconContainer} onPress={toggleMenu}>
        <Text style={styles.icon}>☰</Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={styles.menuContent}>
          <TouchableOpacity onPress={toggleMenu}>
            <Text style={styles.closeIcon}></Text>
          </TouchableOpacity>
          <Link href="/signup" style={styles.menuItem}>
            <Text>Sign Up</Text>
          </Link>
        </View>
      </Animated.View>
    </>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  icon: {
    fontSize: 24,
    color: '#000',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'cyan',
    zIndex: 5,
  },
  menuContent: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  closeIcon: {
    fontSize: 24,
    color: '#000',
    marginBottom: 20,
  },
  menuText: {
    fontSize: 18,
    color: '#000',
  },
});

export default MenuBurger;
