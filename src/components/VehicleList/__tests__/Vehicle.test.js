import React from 'react';
import { render } from '@testing-library/react';
import Vehicle from '../Vehicle';
import getData from '../../../api';

jest.mock('../../../api');

describe('<Vehicle /> Tests', () => {
  it('Should return null if vehicle is missing id or price', () => {
    const { queryByTestId, rerender } = render(<Vehicle vehicle={{}} />);

    expect(queryByTestId('vehicle')).toBeNull();

    rerender(<Vehicle vehicle={{ id: 'car1' }} />);
    expect(queryByTestId('vehicle')).toBeNull();
  });

  it('Should render vehicle details after fetching data', async () => {
    const initial = { id: 'car1', price: '£100' };
    const apiData = {
      description: 'A nice car',
      price: '£100',
      media: [
        { url: '/images/1x1/car1.jpg' },
        { url: '/images/16x9/car1.jpg' },
      ],
    };

    getData.mockResolvedValue(apiData);

    const { findByTestId, findByText, findAllByAltText } = render(<Vehicle vehicle={initial} />);

    const vehicleEl = await findByTestId('vehicle');
    expect(vehicleEl).not.toBeNull();

    expect(await findByText('car1')).not.toBeNull();
    expect(await findByText('£100')).not.toBeNull();
    expect(await findByText('A nice car')).not.toBeNull();

    const imgs = await findAllByAltText('car1');
    expect(imgs.length).toBeGreaterThanOrEqual(1);
  });
});
