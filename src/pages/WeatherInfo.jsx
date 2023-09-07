import SelectLocation from '@/components/weather/SelectLocation';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import GetWeather from '@/components/weather/GetWeather';

export default function WeatherInfo() {
  const [data, setData] = useState([]);
  const [coordinates, setCoordinates] = useState({ x: 52, y: 38 });

  useEffect(() => {
    const baseUrl =
      'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
    const serviceKey = import.meta.env.VITE_WEATHER_API_KEY;

    // 날짜
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    let baseDate = `${year}${month}${day}`;
    // 시간
    const hour = today.getHours();
    const baseTimes = [
      '0200',
      '0500',
      '0800',
      '1100',
      '1400',
      '1700',
      '2000',
      '2300',
    ];

    let baseTime;

    if (hour < 2) {
      // 자정 이전인 경우 전날의 시간으로 설정
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const prevDayYear = yesterday.getFullYear();
      const prevDayMonth = String(yesterday.getMonth() + 1).padStart(2, '0');
      const prevDayDate = String(yesterday.getDate()).padStart(2, '0');

      baseDate = `${prevDayYear}${prevDayMonth}${prevDayDate}`;

      baseTime = '2300';
    } else {
      // 현재 시간 기준으로 가장 가까운 시간 찾기
      const index = baseTimes.findIndex(
        (time) => hour < parseInt(time.slice(0, 2))
      );
      baseTime = index !== -1 ? baseTimes[index - 1] : '2300';
    }

    async function fetchWeatherData() {
      const url = `${baseUrl}?serviceKey=${serviceKey}&pageNo=1&numOfRows=300&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${coordinates.x}&ny=${coordinates.y}`;
      try {
        const response = await fetch(url);
        // console.log(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        // console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchWeatherData();
  }, [coordinates]);

  return (
    <div className="px-8 my-10">
      <Helmet>
        <title>Jeju All in One - 제주 날씨</title>
      </Helmet>
      <h2 className="text-darkblue font-semibold text-4xl text-center my-10">
        제주 날씨
      </h2>
      <div className="flex flex-col justify-center items-center gap-10">
        <SelectLocation onCoordinatesChange={setCoordinates} />
        <GetWeather data={data} />
      </div>
    </div>
  );
}
