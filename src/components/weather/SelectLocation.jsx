import { useState } from 'react';
import data from '@/data.json';
import PropTypes from 'prop-types';

export default function SelectLocation({ onCoordinatesChange }) {
  const [city, setCity] = useState('');
  const [sublocation, setSublocation] = useState('');
  const [coordinates, setCoordinates] = useState({ x: 52, y: 38 });

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setSublocation(''); // city가 변경되면 sublocation 초기화
    setCoordinates({ x: null, y: null }); // 좌표도 초기화
  };

  const handleSublocationChange = (e) => {
    setSublocation(e.target.value);

    // 해당 sublocation의 좌표 찾기
    const locationData = data[city].find((loc) => loc.name === e.target.value);

    if (locationData) {
      setCoordinates({ x: locationData.x, y: locationData.y });
      onCoordinatesChange({ x: locationData.x, y: locationData.y }); // 상위 컴포넌트로 좌표 전달
    }
  };

  return (
    <div className="flex flex-row gap-x-10">
      <p className="text-xl text-center">지역을 선택해주세요</p>
      <select name="city" className="mx-3" onChange={handleCityChange}>
        <option value="">- 1차 선택 -</option>
        {Object.keys(data).map((cityName) => (
          <option key={cityName} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>
      <select name="sublocation" onChange={handleSublocationChange}>
        <option value="">- 2차 선택 -</option>
        {(data[city] || []).map((loc) => (
          <option key={loc.name} value={loc.name}>
            {loc.name}
          </option>
        ))}
      </select>
    </div>
  );
}

SelectLocation.propTypes = {
  onCoordinatesChange: PropTypes.func,
};
