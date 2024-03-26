import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  folderButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  folderButton: {
    width: '80%',
    height: '50%',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 25,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  folderButtonText: {
    fontSize: 26,
    fontWeight: '900',
    marginLeft: 25,
  },
  separator: {
    width: 1,
    backgroundColor: '#ccc',
  },
  folderButtonSubText: {
    fontSize: 14,
    color: '#666',
  },
  folderButtonBackground: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
    alignContent: 'center',
  },
  folderContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: -150,
    marginTop: 25,
    marginLeft: 15,
    marginRight: 35,
  },
});
