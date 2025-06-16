import { initializeApp } from '@react-native-firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJMQGXLf6OzkCQ2fT_BLwz6bybpjA3aWc",
  authDomain: "todoapp-3ae74.firebaseapp.com",
  projectId: "todoapp-3ae74",
  storageBucket: "todoapp-3ae74.firebasestorage.app",
  messagingSenderId: "1029383741143",
  appId: "1:1029383741143:web:9937656fc0a025142e9a92"
};

// Declare auth at module scope
let auth;

// Initialize Firebase
if (Platform.OS === 'web') {
  const { initializeApp: initializeAppWeb } = require('firebase/app');
  const { getAuth: getAuthWeb } = require('firebase/auth');
  const app = initializeAppWeb(firebaseConfig);
  auth = getAuthWeb(app);
} else {
  const app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth };