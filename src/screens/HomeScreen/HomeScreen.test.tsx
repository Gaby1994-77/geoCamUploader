import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import {NavigationProp} from '@react-navigation/native';

interface ParamList {
  Gallery: undefined;
  CameraScreen: undefined;
}

interface HomeScreenProps {
  navigation: NavigationProp<ParamList>;
}

const createTestProps = () =>
  ({
    navigation: {
      navigate: jest.fn(),
    } as Partial<NavigationProp<ParamList>>,
  } as HomeScreenProps);

describe('HomeScreen', () => {
  it('navigates to Gallery when the Gallery button is pressed', () => {
    const props = createTestProps();
    const {getByText} = render(<HomeScreen {...props} />);

    fireEvent.press(getByText('Gallery'));
    expect(props.navigation.navigate).toHaveBeenCalledWith('Gallery');
  });

  it('navigates to CameraScreen when the Camera button is pressed', () => {
    const props = createTestProps();
    const {getByText} = render(<HomeScreen {...props} />);

    fireEvent.press(getByText('Camera'));
    expect(props.navigation.navigate).toHaveBeenCalledWith('CameraScreen');
  });
});
