import React, {useRef} from 'react';
import {View, Text, ImageBackground, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TouchableScale from 'react-native-touchable-scale';
import GalleryScreenStyles from './GalleryScreenStyle';

const photosBackground = require('../../assets/Folderbck/photo1.jpg');
const mapsBackground = require('../../assets/Folderbck/map.jpg');

const GalleryScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const navigateToPhotosFolder = () => {
    navigation.navigate('Photos');
  };

  const navigateToMapsFolder = () => {
    navigation.navigate('Maps');
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 5,
        duration: 10000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 100,
        duration: 10000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      <View style={GalleryScreenStyles.folderContainer}>
        <TouchableScale
          style={[
            GalleryScreenStyles.folderButton,
            {transform: [{scale: scaleValue}]},
          ]}
          onPress={() => {
            animateButton();
            navigateToPhotosFolder();
          }}
          activeScale={0.9}>
          <ImageBackground
            source={photosBackground}
            style={GalleryScreenStyles.folderButtonBackground}
            resizeMode="cover"
            borderRadius={10}
          />
        </TouchableScale>
        <Text style={GalleryScreenStyles.folderButtonText}>Photos</Text>
      </View>

      <View style={GalleryScreenStyles.folderContainer}>
        <TouchableScale
          style={[
            GalleryScreenStyles.folderButton,
            {transform: [{scale: scaleValue}]},
          ]}
          onPress={() => {
            animateButton();
            navigateToMapsFolder();
          }}
          activeScale={0.9}>
          <ImageBackground
            source={mapsBackground}
            style={GalleryScreenStyles.folderButtonBackground}
            resizeMode="cover"
            borderRadius={10}
          />
        </TouchableScale>
        <Text style={GalleryScreenStyles.folderButtonText}>Maps</Text>
      </View>
    </View>
  );
};

export default GalleryScreen;
