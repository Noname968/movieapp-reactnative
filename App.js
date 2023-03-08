import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Moviedetails from './components/Moviedetails';
import Search from './components/Search';
import Drawernav from './pages/Drawernav';
import HomeM from './pages/HomeM';
import HomeT from './pages/HomeT';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Drawer" style={styles.container} component={Drawernav} options={{ headerShown: false }} />
        <Stack.Screen name="HomeM" style={styles.container} component={HomeM} options={{ headerShown: false }} />
        <Stack.Screen name="HomeT" style={styles.container} component={HomeT} options={{ headerShown: false }} />
        <Stack.Screen name="Moviedetails" style={styles.container} component={Moviedetails} options={{ headerShown: false }} />
        <Stack.Screen name="Search" style={styles.container} component={Search} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
