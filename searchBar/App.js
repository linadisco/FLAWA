import React from 'react';
import { SafeAreaView } from 'react-native';
import SearchBar from './components/SearchBar';
import InciBeauty from './components/InciBeauty';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar />
      {/* <InciBeauty /> */}
    </SafeAreaView>
  );
}