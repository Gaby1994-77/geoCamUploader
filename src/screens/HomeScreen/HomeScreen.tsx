import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import styles from './HomeScreenStyle';
import bckImage from '../../assets/images/mainpage.webp';

interface ParamList extends ParamListBase {
  Gallery: undefined;
  CameraScreen: undefined;
}

interface HomeScreenProps {
  navigation: NavigationProp<ParamList>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <ImageBackground
      source={bckImage}
      style={styles.container}
      resizeMode="cover">
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            navigation.navigate('Gallery');
          }}>
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            navigation.navigate('CameraScreen');
          }}>
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
