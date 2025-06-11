import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AddButton from '../components/button/Add';
import MenuBurger from '../components/MenuBurger/MenuBurger';

const Homepage: React.FC = () => {
  const handleAddTask = () => {
    Alert.alert('Add Task', 'Task addition functionality to be implemented!');
  };

  return (
    <View style={styles.container}>
      <MenuBurger />
      <Text style={styles.title}>ToDo App</Text>
      <View style={styles.buttonContainer}>
        <AddButton onPress={handleAddTask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60, // Adjusted to avoid overlap with MenuBurger
    alignSelf: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
});

export default Homepage;