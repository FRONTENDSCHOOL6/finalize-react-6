import SelectLocation from '@/components/weather/SelectLocation';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import GetWeather from '@/components/weather/GetWeather';

export default function WeatherInfo() {
  const [data, setData] = useState([]);
  const [coordinates, setCoordinates] = useState({ x: 52, y: 38 });

  useEffect(() => {
    if (!coordinates.x || !coordinates.y) return; // 만약 좌표가 없다면 API 호출을 중지

    const baseUrl =
      'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
    const serviceKey = import.meta.env.VITE_WEATHER_API_KEY;

    // 날짜
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const baseDate = `${year}${month}${day}`;
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
    // let baseTime = '';
    // for (let i = 0; i < baseTimes.length; i++) {
    //   if (hour < parseInt(baseTimes[i].slice(0, 2))) {
    //     baseTime = i !== 0 ? baseTimes[i - 1] : '2300'; // 첫 번째 요소일 경우 '2300'
    //     break;
    //   }
    // }
    // if (!baseTime) {
    //   baseTime = '2300';
    // }

    const index = baseTimes.findIndex(
      (time) => hour < parseInt(time.slice(0, 2))
    );
    let baseTime = index !== -1 ? baseTimes[index - 1] : '2300';

    async function fetchWeatherData() {
      const url = `${baseUrl}?serviceKey=${serviceKey}&pageNo=1&numOfRows=100&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${coordinates.x}&ny=${coordinates.y}`;
      try {
        const response = await fetch(url);
        console.log(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        console.log(data);
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
