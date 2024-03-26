import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  gridItem: {
    flex: 1 / 3,
    margin: 0.5,
    aspectRatio: 1,
  },
  photo: {
    flex: 1,
    backgroundColor: '#eee',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'transparent',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007aff',
    borderRadius: 5,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#500',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 100,
    shadowRadius: 3.84,
    elevation: 8,
    marginRight: 5,
  },
  textbutton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#007aff',
    fontWeight: 'bold',
  },
});

export default styles;
