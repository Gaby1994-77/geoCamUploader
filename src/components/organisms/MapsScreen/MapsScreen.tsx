import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {View} from 'react-native';
import styles from './MapsScreenStyles';

const MapsScreen = () => {
  return (
    <View style={styles.mapcontainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 34.0221188,
          longitude: 35.6458772,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}>
        <Marker
          coordinate={{
            latitude: 34.0221188,
            longitude: 35.6458772,
          }}
          title="Photo"
          description="Home"
        />
      </MapView>
    </View>
  );
};
export default MapsScreen;
