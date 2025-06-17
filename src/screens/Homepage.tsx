// Import React and specific hooks for managing component state and lifecycle
import React, { useState, useEffect } from 'react';

// Import React Native components for UI rendering and user interaction
import { View, Text, StyleSheet, FlatList, Modal, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';

// Import Swipeable for swipe-to-delete gesture functionality
import { Swipeable } from 'react-native-gesture-handler';

// Import DateTimePicker for selecting task deadlines
import DateTimePicker from '@react-native-community/datetimepicker';

// Import custom AddButton component for adding new tasks
import AddButton from '../components/button/Add';

// Import custom MenuBurger component for navigation menu
import MenuBurger from '../components/MenuBurger/MenuBurger';

// Import storage service functions for task CRUD operations
import { addTask, getTasks, updateTask, deleteTask } from '../services/storage';

// Import Task type for TypeScript type safety
import { Task } from '../types/task';


// Define the Homepage functional component
const Homepage: React.FC = () => {
  // Initialize state for storing tasks as an array of Task objects
  const [tasks, setTasks] = useState<Task[]>([]);

  // Initialize state for controlling the visibility of the task creation modal, so on click the task creation becomes viewable
  const [modalVisible, setModalVisible] = useState(false);

  // Initialize state for storing the task title input
  const [title, setTitle] = useState('');

  // Initialize state for storing the task description input
  const [description, setDescription] = useState('');

  // Initialize state for storing the task deadline, defaulting to current date
  const [deadline, setDeadline] = useState(new Date());

  // Initialize state for controlling the visibility of the date picker
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Use useEffect to load tasks when the component mounts
  useEffect(() => {
    // Define async function to fetch tasks from storage
    const loadTasks = async () => {
      // Try to load tasks
      try {
        // Fetch tasks using getTasks service
        const loadedTasks = await getTasks();
        // Update tasks state with loaded tasks
        setTasks(loadedTasks);
      // Catch any errors during task loading
      } catch (error) {
        // Show an alert if task loading fails
        Alert.alert('Error', 'Failed to load tasks');
      }
    };
    // Call loadTasks function
    loadTasks();
  // Empty dependency array ensures this runs only on mount
  }, []);

  // Define function to handle adding a new task
  const handleAddTask = async () => {
    // Check if title is empty or only whitespace
    if (!title.trim()) {
      // Show an alert if title is missing
      Alert.alert('Error', 'Task title is required');
      // Exit function
      return;
    }
    // Try to add the new task
    try {
      // Create new task using addTask service
      const newTask = await addTask({
        // Trim title to remove extra whitespace
        title: title.trim(),
        // Trim description, or undefined if empty
        description: description.trim() || undefined,
        // Convert deadline to ISO string format
        deadline: deadline.toISOString(),
      });
      // Update tasks state by appending the new task
      setTasks([...tasks, newTask]);
      // Close the modal
      setModalVisible(false);
      // Reset title input
      setTitle('');
      // Reset description input
      setDescription('');
      // Reset deadline to current date
      setDeadline(new Date());
    // Catch any errors during task addition
    } catch (error) {
      // Show an alert if task addition fails
      Alert.alert('Error', 'Failed to add task');
    }
  };

  // Define function to toggle task completion status
  const handleToggleComplete = async (task: Task) => {
    // Try to update the task
    try {
      // Create updated task with toggled completion status
      const updatedTask = { ...task, completed: !task.completed };
      // Update task in storage using updateTask service
      await updateTask(updatedTask);
      // Update tasks state by replacing the task with the updated version
      setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
    // Catch any errors during task update
    } catch (error) {
      // Show an alert if task update fails
      Alert.alert('Error', 'Failed to update task');
    }
  };

  // Define function to delete a task
  const handleDeleteTask = async (taskId: string) => {
    // Try to delete the task
    try {
      // Delete task from storage using deleteTask service
      await deleteTask(taskId);
      // Update tasks state by filtering out the deleted task
      setTasks(tasks.filter(t => t.id !== taskId));
    // Catch any errors during task deletion
    } catch (error) {
      // Show an alert if task deletion fails
      Alert.alert('Error', 'Failed to delete task');
    }
  };

  // Define function to render swipe-to-delete action for a task
  const renderRightActions = (taskId: string) => (
    // Render a TouchableOpacity for the delete button
    <TouchableOpacity
      // Apply delete button styles
      style={styles.deleteButton}
      // Call handleDeleteTask when pressed
      onPress={() => handleDeleteTask(taskId)}
    >
      // Render "Delete" text
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  // Define function to render a single task item
  const renderTask = ({ item }: { item: Task }) => (
    // Wrap task in Swipeable for swipe-to-delete functionality
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      // Render TouchableOpacity for task interaction
      <TouchableOpacity
        // Apply task styles, with background color based on completion status
        style={[styles.task, { backgroundColor: item.completed ? '#00FFFF' : '#D3D3D3' }]}
        // Toggle completion when pressed
        onPress={() => handleToggleComplete(item)}
      >
        // Render task title
        <Text style={styles.taskTitle}>{item.title}</Text>
        // Conditionally render task description if it exists
        {item.description && <Text style={styles.taskDescription}>{item.description}</Text>}
        // Conditionally render task deadline if it exists
        {item.deadline && (
          // Render deadline as formatted date
          <Text style={styles.taskDeadline}>
            Due: {new Date(item.deadline).toLocaleDateString()}
          </Text>
        )}
      </TouchableOpacity>
    </Swipeable>
  );

  // Render the main component UI
  return (
    // Render root View with container styles
    <View style={styles.container}>
      // Render MenuBurger for navigation
      <MenuBurger />
      // Render app title
      <Text style={styles.title}>ToDo App</Text>
      // Render FlatList to display tasks
      <FlatList
        // Pass tasks data to FlatList
        data={tasks}
        // Specify render function for each task
        renderItem={renderTask}
        // Use task ID as unique key
        keyExtractor={item => item.id}
        // Apply task list styles
        style={styles.taskList}
        // Render text when no tasks exist
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet</Text>}
      />
      // Render container for AddButton
      <View style={styles.buttonContainer}>
        // Render AddButton to open task creation modal
        <AddButton onPress={() => setModalVisible(true)} />
      </View>

      // Render Modal for task creation
      <Modal visible={modalVisible} animationType="slide" transparent>
        // Render modal container with semi-transparent background
        <View style={styles.modalContainer}>
          // Render modal content
          <View style={styles.modalContent}>
            // Render modal title
            <Text style={styles.modalTitle}>Add Task</Text>
            // Render TextInput for task title
            <TextInput
              // Apply input styles
              style={styles.input}
              // Set placeholder text
              placeholder="Task Title"
              // Bind title state
              value={title}
              // Update title state on change
              onChangeText={setTitle}
            />
            // Render TextInput for task description
            <TextInput
              // Apply input styles
              style={styles.input}
              // Set placeholder text
              placeholder="Description (optional)"
              // Bind description state
              value={description}
              // Update description state on change
              onChangeText={setDescription}
              // Enable multiline input
              multiline
            />
            // Render TouchableOpacity for selecting deadline
            <TouchableOpacity
              // Apply date button styles
              style={styles.dateButton}
              // Show date picker when pressed
              onPress={() => setShowDatePicker(true)}
            >
              // Display formatted deadline
              <Text>Deadline: {deadline.toLocaleDateString()}</Text>
            </TouchableOpacity>
            // Conditionally render DateTimePicker
            {showDatePicker && (
              // Render DateTimePicker for selecting deadline
              <DateTimePicker
                // Bind deadline value
                value={deadline}
                // Set mode to date selection
                mode="date"
                // Use inline display on iOS, default on Android
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                // Handle date selection
                onChange={(event, selectedDate) => {
                  // Hide date picker on iOS after selection
                  setShowDatePicker(Platform.OS === 'ios');
                  // Update deadline if a date is selected
                  if (selectedDate) setDeadline(selectedDate);
                }}
              />
            )}
            // Render container for modal buttons
            <View style={styles.modalButtons}>
              // Render Cancel button
              <TouchableOpacity
                // Apply cancel button styles
                style={[styles.modalButton, styles.cancelButton]}
                // Close modal when pressed
                onPress={() => setModalVisible(false)}
              >
                // Render "Cancel" text
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              // Render Save button
              <TouchableOpacity
                // Apply save button styles
                style={[styles.modalButton, styles.saveButton]}
                // Add task when pressed
                onPress={handleAddTask}
              >
                // Render "Save" text
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Define styles for the component using StyleSheet
const styles = StyleSheet.create({
  // Style for the root container
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  // Style for the app title
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  // Style for the task list
  taskList: {
    flex: 1,
  },
  // Style for individual task items
  task: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  // Style for task title text
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  // Style for task description text
  taskDescription: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  // Style for task deadline text
  taskDeadline: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  // Style for empty task list text
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
  // Style for AddButton container
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  // Style for delete button in swipe action
  deleteButton: {
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 5,
    marginVertical: 5,
  },
  // Style for delete button text
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Style for modal container
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  // Style for modal content
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
  },
  // Style for modal title
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  // Style for input fields
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  // Style for date picker button
  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  // Style for modal buttons container
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Style for modal buttons
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  // Style for cancel button
  cancelButton: {
    backgroundColor: '#ccc',
  },
  // Style for save button
  saveButton: {
    backgroundColor: '#00FFFF',
  },
  // Style for button text
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

// Export the Homepage component as default
export default Homepage;