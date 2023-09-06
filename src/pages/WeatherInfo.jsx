import { useEffect } from 'react';

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
      <h2 className="w-[640px] h-[64px] bg-blue flex justify-center items-center mx-auto text-3xl text-lightsand my-10">
        제주 날씨
      </h2>
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="h-[50px] leading-[50px]">
          <span className="w-[100px] inline-flex text-2xl">지역</span>
          <select name="location" className="mx-3">
            <option value="">- 선택 -</option>
            <option value="제주시">제주시</option>
            <option value="서귀포시">서귀포시</option>
          </select>
          <select>
            <option>- 선택 -</option>
            <option>OO동</option>
            <option>OO동</option>
          </select>
        </div>
        <p className="text-5xl">기온 25&deg;C</p>
        <img
          src="/public/weather/clear.svg"
          alt="맑음"
          className="w-[100px] h-[100px]"
        />
        <div>
          <span className="text-xl px-10">강수확률 0%</span>
          <span className="text-xl px-10">풍속 3ml/s</span>
        </div>

        <table className="border-2 w-6/12 text-center text-xl h-[150px]">
          <tr className="border-2">
            <td className="border-2"></td>
            <td className="border-2">오늘</td>
            <td className="border-2">내일</td>
            <td className="border-2">모레</td>
            <td className="border-2">글피</td>
          </tr>
          <tr className="border-2">
            <td className="border-2">
              최<span className="text-red-600">고</span> 기온
            </td>
            <td className="border-2">30&deg;C</td>
            <td className="border-2">29&deg;C</td>
            <td className="border-2">28&deg;C</td>
            <td className="border-2">27&deg;C</td>
          </tr>
          <tr className="border-2">
            <td className="border-2">
              최<span className="text-sky-600">저</span> 기온
            </td>
            <td className="border-2">20&deg;C</td>
            <td className="border-2">21&deg;C</td>
            <td className="border-2">22&deg;C</td>
            <td className="border-2">23&deg;C</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
