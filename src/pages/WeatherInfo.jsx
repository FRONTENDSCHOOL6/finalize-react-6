import SelectLocation from '@/components/weather/SelectLocation';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import GetWeather from '@/components/weather/GetWeather';
import GetTemperature from '@/components/weather/GetTemperature';

export default function WeatherInfo() {
  //# 단기예보조회
  // const baseTimes = [
  //   '0200',
  //   '0500',
  //   '0800',
  //   '1100',
  //   '1400',
  //   '1700',
  //   '2000',
  //   '2300',
  // ];
  // const baseTimes = ['1100'];
  // const baseUrl =
  //   'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
  // const serviceKey =
  //   '4vq6kWslvJHgm6Z3JNfZ797PVPnMRYzMInRfcfx9volp2z1Dxf9qMU49eqXJ590RXLgYbOTjSQ1aC0easyCbUw%3D%3D'; // 여기에 서비스 키를 삽입하세요

  // async function fetchWeatherData(baseTimes) {
  //   const url = `${baseUrl}?serviceKey=${serviceKey}&pageNo=1&numOfRows=30&dataType=JSON&base_date=20230906&base_time=${baseTimes}&nx=52&ny=38`;

  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     console.log('Weather Data:', data);
  //     // 여기에서 데이터를 가지고 원하는 처리를 수행하세요.
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }

  // useEffect(() => {
  //   // 컴포넌트가 마운트될 때 또는 baseTimes 배열이 업데이트될 때마다 데이터 가져오기를 수행합니다.
  //   baseTimes.forEach((baseTimes) => {
  //     fetchWeatherData(baseTimes);
  //   });
  // }, []);

  // let xhr = new XMLHttpRequest();
  // let url =
  //   'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
  // let queryParams =
  //   '?' +
  //   encodeURIComponent('serviceKey') +
  //   '=' +
  //   '4vq6kWslvJHgm6Z3JNfZ797PVPnMRYzMInRfcfx9volp2z1Dxf9qMU49eqXJ590RXLgYbOTjSQ1aC0easyCbUw%3D%3D'; /*Service Key*/
  // queryParams +=
  //   '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
  // queryParams +=
  //   '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
  // queryParams +=
  //   '&' +
  //   encodeURIComponent('dataType') +
  //   '=' +
  //   encodeURIComponent('JSON'); /**/
  // queryParams +=
  //   '&' +
  //   encodeURIComponent('base_date') +
  //   '=' +
  //   encodeURIComponent('20230906'); /**/
  // queryParams +=
  //   '&' +
  //   encodeURIComponent('base_time') +
  //   '=' +
  //   encodeURIComponent('0500'); /**/
  // queryParams +=
  //   '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('52'); /**/
  // queryParams +=
  //   '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('38'); /**/
  // xhr.open('GET', url + queryParams);
  // xhr.onreadystatechange = function () {
  //   if (this.readyState == 4) {
  //     console.log(
  //       'Status: ' +
  //         this.status +
  //         'nHeaders: ' +
  //         JSON.stringify(this.getAllResponseHeaders()) +
  //         'nBody: ' +
  //         this.responseText
  //     );
  //   }
  // };

  // xhr.send('');

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
