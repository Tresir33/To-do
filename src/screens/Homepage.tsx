import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import AddButton from '../components/button/Add';
import MenuBurger from '../components/MenuBurger/MenuBurger';
import { addTaskLocally, getLocalTasks } from '../services/storage';

const Homepage: React.FC = () => {
  const handleAddTask = () => {
    Alert.alert('Add Task', 'Task addition functionality to be implemented!');
  };

  useEffect(() => {
    const testAsyncStorage = async () => {
      try {
        await addTaskLocally('testUser', {
          title: 'Test Task',
          deadline: new Date().toISOString(),
          description: 'Test description',
        });
        const tasks = await getLocalTasks('testUser');
        if (Platform.OS === 'web') {
          alert(`Success: Added task: ${tasks[0].title}`);
        } else {
          Alert.alert('Success', `Added task: ${tasks[0].title}`);
        }
        console.log('Tasks:', tasks);
      } catch (error) {
        console.error('Test AsyncStorage error:', error);
        if (Platform.OS === 'web') {
          alert('Error: Failed to add test task.');
        } else {
          Alert.alert('Error', 'Failed to add test task.');
        }
      }
    };
    testAsyncStorage();
  }, []);

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
    marginTop: 60,
    alignSelf: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
});

export default Homepage;