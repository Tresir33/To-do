import { initializeApp } from '@react-native-firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJMQGXLf6OzkCQ2fT_BLwz6bybpjA3aWc",
  authDomain: "todoapp-3ae74.firebaseapp.com",
  projectId: "todoapp-3ae74",
  storageBucket: "todoapp-3ae74.firebasestorage.app",
  messagingSenderId: "1029383741143",
  appId: "1:1029383741143:web:9937656fc0a025142e9a92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };