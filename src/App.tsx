// to-do/src/app.tsx
import React from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Slot /> {/* Renders Expo Router routes, e.g., app/index.tsx */}
    </View>
  );
};

export default App;