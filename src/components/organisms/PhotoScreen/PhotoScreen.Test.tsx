import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import PhotosScreen from './PhotoScreen';

describe('<PhotosScreen />', () => {
  it('renders loading indicator initially', () => {
    const {getByTestId} = render(<PhotosScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('fetches and renders photos properly', async () => {
    const {getByTestId} = render(<PhotosScreen />);
    await waitFor(() => {
      expect(getByTestId('photo-grid')).toBeTruthy();
    });
  });

  it('opens modal on photo selection', async () => {
    const {getAllByTestId, getByTestId} = render(<PhotosScreen />);
    await waitFor(() => {
      fireEvent.press(getAllByTestId('photo')[0]);
    });
    expect(getByTestId('modal')).toBeTruthy();
  });
});
