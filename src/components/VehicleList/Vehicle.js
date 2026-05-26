import React, { useEffect, useState } from 'react';
import getData from '../../api';

export default function Vehicle({ vehicle }) {
  const [vehicleInfo, setVehicleInfo] = useState(vehicle);

  useEffect(() => {
    const getVehicleData = async () => {
      try {
        const data = await getData(vehicle.id);
        setVehicleInfo((prev) => ({ ...prev, ...data }));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    getVehicleData();
  }, [vehicle?.id]);

  if (!vehicleInfo.id || !vehicleInfo.price) return null;

  const {
    id,
    description,
    price,
    media
  } = vehicleInfo;

  const squareImg = media?.find((img) => img.url.includes('1x1'));
  const videoImg = media?.find((img) => img.url.includes('16x9'));

  return (
    <li className="vehicles__single" data-testid="vehicle">
      {squareImg && <img className="vehicles__image vehicles__image--square" src={squareImg.url} alt={id} />}
      {videoImg && <img className="vehicles__image vehicles__image--video" src={videoImg.url} alt={id} />}
      <div className="vehicles__textarea">
        <h2 className="vehicles__header">{id}</h2>
        <div className="vehicles__price">{price}</div>
        <div className="vehicles__description">{description}</div>
      </div>
    </li>
  );
}
