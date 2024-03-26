import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import React, {useRef, useState, useEffect} from 'react';
import {View, Alert, Linking, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import styles from './CamerScreenStyle';
import GetLocation from 'react-native-get-location';

const CameraScreen: React.FC = () => {
  const {requestPermission, hasPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  const [isCameraVisible, setIsCameraVisible] = useState(false);

  useEffect(() => {
    const checkAndOpenCamera = async () => {
      if (hasPermission) {
        setIsCameraVisible(true);
      } else {
        const isAccessGranted = await requestPermission();
        if (!isAccessGranted) {
          Alert.alert(
            'Permission required',
            'Open settings to grant permission',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Open settings',
                style: 'default',
                onPress: async () => {
                  await Linking.openSettings();
                },
              },
            ],
          );
        } else {
          setIsCameraVisible(true);
        }
      }
    };

    checkAndOpenCamera();
  }, [hasPermission, requestPermission]);

  const takePhotoAndSave = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto();

        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        });
        await CameraRoll.saveAsset(photo.path);
        const response = await fetch(
          'https://660069ee87c91a1164194c74.mockapi.io/gallerypicme/mypics',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              DateTaken: new Date(),
              Path: photo.path,
              latitude: location.latitude,
              longitude: location.longitude,
            }),
          },
        );

        if (!response.ok) {
          throw new Error('Failed to save photo and location to API');
        }

        Alert.alert('Success', 'Photo taken and location saved successfully');
      } catch (error) {
        console.error('Error taking photo or fetching location:', error);
        Alert.alert(
          'Error',
          'Failed to take and save photo or fetch location. Please try again later.',
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isCameraVisible && device && (
        <View style={styles.cameraContainer}>
          <Camera
            ref={camera}
            style={styles.camera}
            device={device}
            isActive={true}
            photo={true}
          />
          <Pressable
            onPress={takePhotoAndSave}
            style={styles.captureButton}
            testID="capture-button"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CameraScreen;
