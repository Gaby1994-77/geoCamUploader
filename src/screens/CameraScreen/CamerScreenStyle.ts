import {StyleSheet} from 'react-native';

const BUTTON_SIZE = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  noCameraText: {
    fontSize: 18,
    color: 'red',
  },
  previewContainer: {
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  settingsButton: {
    marginTop: 20,
    padding: 10,
  },
  settingsButtonText: {
    fontSize: 18,
    color: 'blue',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
