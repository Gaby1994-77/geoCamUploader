import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Modal,
  RefreshControl,
  Animated,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import styles from './PhotoScreenStyle';
import {launchImageLibrary} from 'react-native-image-picker';
import GetLocation from 'react-native-get-location';

interface Photo {
  id: string;
  Path: string;
  latitude: number;
  longitude: number;
  date: string;
}

const PhotosScreen: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhotoLocation, setSelectedPhotoLocation] =
    useState<Photo | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(
        'https://660069ee87c91a1164194c74.mockapi.io/gallerypicme/mypics',
      );
      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }
      const data = await response.json();
      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
      const photoDetails: Photo[] = data.map((photo: any) => ({
        id: photo.id,
        Path: `file://${photo.Path}`,
        latitude: photo.latitude,
        longitude: photo.longitude,
        date: formattedDate,
      }));
      setPhotos(photoDetails.reverse());
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const deletePhoto = async (photoId: string) => {
    try {
      const updatedPhotos = photos.filter(photo => photo.id !== photoId);
      setPhotos(updatedPhotos);
      const response = await fetch(
        `https://660069ee87c91a1164194c74.mockapi.io/gallerypicme/mypics/${photoId}`,
        {
          method: 'DELETE',
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete photo from the API');
      }
      console.log(`Photo with ID ${photoId} deleted`);
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleShowDetails = (photo: Photo) => {
    const goToLocation = () => {
      setSelectedPhotoLocation(photo);
    };
    const deletePhotoConfirmation = () => {
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this photo?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Delete', onPress: () => deletePhoto(photo.id)},
        ],
        {cancelable: false},
      );
    };
    Alert.alert(
      'Photo Details',
      `ID: ${photo.id}\nDate: ${photo.date}\nLatitude: ${photo.latitude}, Longitude: ${photo.longitude}`,
      [
        {text: 'Go to Location', onPress: goToLocation},
        {text: 'Delete Photo', onPress: deletePhotoConfirmation},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const handleOpenImage = (photo: Photo) => {
    setSelectedPhoto(photo);
    setShowModal(true);
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    setShowModal(false);
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const renderGridItem = ({item}: {item: Photo}) => (
    <TouchableOpacity
      onPress={() => handleOpenImage(item)}
      onLongPress={() => handleShowDetails(item)}
      style={styles.gridItem}>
      <Image source={{uri: item.Path}} style={styles.photo} />
    </TouchableOpacity>
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchPhotos();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  const addNewPhoto = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      async response => {
        if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          if (selectedImage.uri) {
            try {
              const location = await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
              });

              const apiResponse = await fetch(
                'https://660069ee87c91a1164194c74.mockapi.io/gallerypicme/mypics',
                {
                  method: 'POST',
                  body: JSON.stringify({
                    Path: selectedImage.uri,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    date: new Date().toISOString(),
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
              );

              if (!apiResponse.ok) {
                throw new Error('Failed to upload photo to API');
              } else {
                const newPhoto = await apiResponse.json();
                Alert.alert('Success', 'Photo uploaded Successfully');
                setPhotos(prevPhotos => [
                  {
                    id: newPhoto.id,
                    Path: `file://${newPhoto.Path}`,
                    latitude: newPhoto.latitude,
                    longitude: newPhoto.longitude,
                    date: newPhoto.date,
                  },
                  ...prevPhotos,
                ]);
              }
            } catch (error) {
              console.error('Error:', error);
              Alert.alert(
                'Error',
                'Failed to upload photo. Please try again later.',
              );
            }
          }
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderGridItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007aff']}
            tintColor={'#007aff'}
          />
        }
      />
      {selectedPhotoLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: selectedPhotoLocation.latitude,
            longitude: selectedPhotoLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: selectedPhotoLocation.latitude,
              longitude: selectedPhotoLocation.longitude,
            }}
            title="Photo Location"
          />
        </MapView>
      )}
      <Modal visible={showModal} transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={closeModal}>
            {selectedPhoto && (
              <Animated.Image
                source={{uri: selectedPhoto.Path}}
                style={[styles.modalImage, {transform: [{scale: scaleValue}]}]}
              />
            )}
          </TouchableOpacity>
        </View>
      </Modal>
      {!selectedPhotoLocation && (
        <TouchableOpacity onPress={addNewPhoto} style={styles.addButton}>
          <Text style={styles.textbutton}> Add Photo </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PhotosScreen;
