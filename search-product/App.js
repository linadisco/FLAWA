import React from 'react';
import { SafeAreaView } from 'react-native';
import SearchBar from './components/SearchBar';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar />
    </SafeAreaView>
  );
}
