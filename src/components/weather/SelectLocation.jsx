import { useState } from 'react';
import data from '@/data.json';
import PropTypes from 'prop-types';

export default function SelectLocation({
  onCityChange,
  onSublocationChange,
  onCoordinatesChange,
}) {
  const [city, setCity] = useState('');
  const [sublocation, setSublocation] = useState('');
  const [coordinates, setCoordinates] = useState({ x: 52, y: 38 });

  const handleCityChange = (e) => {
    setCity(e.target.value);

    // setSublocation(''); // city가 변경되면 sublocation 초기화
    setCoordinates({ x: null, y: null }); // 좌표도 초기화
    onCityChange(e.target.value); // 상위 컴포넌트로 좌표 전달
  };

  const handleSublocationChange = (e) => {
    setSublocation(e.target.value);
    onSublocationChange(e.target.value); // 상위 컴포넌트로 좌표 전달

    // 해당 data.json에서 sublocation의 좌표 찾기
    const locationData = data[city].find((loc) => loc.name === e.target.value);

    if (locationData) {
      setCoordinates({ x: locationData.x, y: locationData.y });
      onCoordinatesChange({ x: locationData.x, y: locationData.y }); // 상위 컴포넌트로 좌표 전달
    }
  };

  return (
    <div className="flex flex-row gap-x-10">
      <p className="text-xl text-center">지역을 선택해주세요</p>
      <label htmlFor="city" className="sr-only">
        시 선택
      </label>
      <select
        id="city"
        name="city"
        className="mx-3 dark:bg-transparent"
        onChange={handleCityChange}
      >
        <option value="">- 시 -</option>
        {Object.keys(data).map((cityName) => (
          <option
            key={cityName}
            value={cityName}
            // selected={cityName === '제주시' ? true : false}
          >
            {cityName}
          </option>
        ))}
      </select>
      <label htmlFor="sublocation" className="sr-only">
        동/읍 선택
      </label>
      <select
        id="sublocation"
        name="sublocation"
        className="dark:bg-transparent"
        onChange={handleSublocationChange}
      >
        <option value="">- 동/읍 -</option>
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
  onCityChange: PropTypes.func,
  onSublocationChange: PropTypes.func,
  onCoordinatesChange: PropTypes.func,
};
