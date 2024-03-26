import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import GalleryScreen from './GalleryScreen';

describe('GalleryScreen', () => {
  test('navigates to Photos folder when Photos button is pressed', () => {
    const mockNavigation = {navigate: jest.fn()};
    const {getByText} = render(<GalleryScreen navigation={mockNavigation} />);

    const photosButton = getByText('Photos');
    fireEvent.press(photosButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Photos');
  });

  test('navigates to Maps folder when Maps button is pressed', () => {
    const mockNavigation = {navigate: jest.fn()};
    const {getByText} = render(<GalleryScreen navigation={mockNavigation} />);

    const mapsButton = getByText('Maps');
    fireEvent.press(mapsButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Maps');
  });

  test('button scales on touch', () => {
    const {getByTestId} = render(<GalleryScreen />);

    const photosButton = getByTestId('photos-button');
    userEvent.touchStart(photosButton);

    expect(photosButton).toHaveStyle({transform: [{scale: 0.9}]});
  });
});
