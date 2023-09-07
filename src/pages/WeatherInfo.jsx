import SelectLocation from '@/components/weather/SelectLocation';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import GetWeather from '@/components/weather/GetWeather';
import GetTemperature from '@/components/weather/GetTemperature';

export default function WeatherInfo() {
  //# 단기예보조회
  const baseUrl =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
  const serviceKey =
    '4vq6kWslvJHgm6Z3JNfZ797PVPnMRYzMInRfcfx9volp2z1Dxf9qMU49eqXJ590RXLgYbOTjSQ1aC0easyCbUw%3D%3D';
  const today = new Date();
  // 날짜
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
  let baseTime = '';
  for (let i = 0; i < baseTimes.length; i++) {
    if (hour < parseInt(baseTimes[i].slice(0, 2))) {
      baseTime = baseTimes[i - 1];
      break;
    }
  }
  if (!baseTime) {
    baseTime = '2300';
  }

  async function fetchWeatherData() {
    const url = `${baseUrl}?serviceKey=${serviceKey}&pageNo=1&numOfRows=30&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=52&ny=38`;
    console.log(url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Weather Data:', data);
      console.log('기온:', data.response.body.items.item[0].fcstValue);
      console.log('풍속:', data.response.body.items.item[4].fcstValue);
      console.log('하늘상태:', data.response.body.items.item[5].fcstValue);
      console.log('강수형태:', data.response.body.items.item[6].fcstValue);
      console.log('강수확률:', data.response.body.items.item[7].fcstValue);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="px-8 my-10">
      <Helmet>
        <title>Jeju All in One - 제주 날씨</title>
      </Helmet>
      <h2 className="text-darkblue font-semibold text-4xl text-center my-10">
        제주 날씨
      </h2>
      <div className="flex flex-col justify-center items-center gap-10">
        <SelectLocation />
        <GetWeather />
        <GetTemperature />
      </div>
    </div>
  );
}
