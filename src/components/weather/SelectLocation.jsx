import { useState } from 'react';
import data from '@/data.json';

export default function SelectLocation() {
  const [city, setCity] = useState('');
  const [sublocation, setSublocation] = useState('');
  const [coordinates, setCoordinates] = useState({ x: null, y: null });

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
    }
  };

  return (
    <div className="h-[50px] leading-[50px]">
      <span className="w-[100px] inline-flex text-xl">지역</span>
      <select name="city" className="mx-3" onChange={handleCityChange}>
        <option value="">- 선택 -</option>
        {Object.keys(data).map((cityName) => (
          <option key={cityName} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>

      <select name="sublocation" onChange={handleSublocationChange}>
        <option value="">- 선택 -</option>

        {(data[city] || []).map((loc) => (
          <option key={loc.name} value={loc.name}>
            {loc.name}
          </option>
        ))}
      </select>

      {coordinates.x && coordinates.y && (
        <p>
          선택된 지역의 좌표는 ({coordinates.x}, {coordinates.y})입니다.
        </p>
      )}
    </div>
  );
}
