import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import GalleryScreen from '../screens/GalleryScreen/GalleryScreen';
import CameraScreen from '../screens/CameraScreen/CameraScreen';
import PhotosScreen from '../components/organisms/PhotoScreen/PhotoScreen';
import MapsScreen from '../components/organisms/MapsScreen/MapsScreen';
import RootStackParamList from './AppNavigator';

const Stack = createStackNavigator<RootStackParamList>();
export type RootStackParamList = {
  Home: undefined;
  Gallery: undefined;
  CameraScreen: undefined;
  Photos: undefined;
  Maps: undefined;
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{title: 'Gallery'}}
        />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{title: 'Camera'}}
        />
        <Stack.Screen
          name="Photos"
          component={PhotosScreen}
          options={{title: 'Photos'}}
        />
        <Stack.Screen
          name="Maps"
          component={MapsScreen}
          options={{title: 'Maps'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
