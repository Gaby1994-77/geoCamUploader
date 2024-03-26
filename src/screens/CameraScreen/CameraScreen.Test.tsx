import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import CameraScreen from './CameraScreen';

describe('CameraScreen', () => {
  test('takePhotoAndSave function is called when capture button is pressed', async () => {
    const mockTakePhotoAndSave = jest.fn();
    const {getByTestId} = render(<CameraScreen />);
    jest
      .spyOn(React, 'useRef')
      .mockReturnValueOnce({current: {takePhoto: mockTakePhotoAndSave}});

    const captureButton = getByTestId('capture-button');
    fireEvent.press(captureButton);

    await waitFor(() => {
      expect(mockTakePhotoAndSave).toHaveBeenCalled();
    });
  });
});
