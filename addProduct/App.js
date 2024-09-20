import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AddProduct from './components/addProduct';  // Composant avec majuscule

export default function App() {
  return (
    <View style={styles.container}>
      <AddProduct />  {/* Le composant commence par une majuscule */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
