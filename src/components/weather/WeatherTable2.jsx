import PropTypes from 'prop-types';
import OnedayWeather2 from './OnedayWeather2';
import { useState } from 'react';
import { useEffect } from 'react';

export default function WeatherTable2({
  coordinates = { x: 52, y: 38 },
  baseDate,
}) {
  const [data, setData] = useState({});

  const baseUrl =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
  const serviceKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    async function fetchWeatherData() {
      const { x, y } = coordinates;
      const url = `${baseUrl}?serviceKey=${serviceKey}&pageNo=1&numOfRows=1500&dataType=JSON&base_date=${baseDate}&base_time=0200&nx=${x}&ny=${y}`;
      try {
        const response = await fetch(url);
        console.log(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log('setData 전 data:', data);
        console.log('setData 전 result:', result);
        setData(result);
        console.log('setData 후 data:', data);
        console.log('setData 후 result:', result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchWeatherData();
  }, [coordinates]);

  return (
    <table className="border-2 w-2/3 text-center text-xl">
      <thead className="border-2">
        <tr className="bg-lightsand">
          <th className="border-2 h-[50px]"></th>
          {data?.response?.body?.items?.item
            .filter((item) => {
              if (item.fcstDate && item.category === 'TMX') {
                return true; // 첫 번째로 발견된 해당 날짜의 예보만 선택
              }
              return false; // 코드의 의도를 명확히 하기 위해 작성
            })

            .slice(0, 3) // 3일(24시간*3칸) 랜더링
            .map((item) => {
              const month = parseInt(item.fcstDate.slice(4, 6), 10); // '09' -> 9
              const day = parseInt(item.fcstDate.slice(6), 10); // '01' -> 1
              return (
                <th
                  key={`${item.fcstDate}-${item.fcstTime}-${item.category}`}
                  className="border-2"
                >
                  {`${month}/${day}`}
                </th>
              );
            })}
        </tr>
      </thead>
      <tbody className="border-2">
        <tr>
          <th className="border-2 h-[50px]">
            최<span className="text-red-600">고</span> 기온
          </th>
          {/* {data && <OnedayWeather2 data={data} category={'TMX'} text={'°C'} />} */}
        </tr>
        <tr>
          <th className="border-2 h-[50px]">
            최<span className="text-sky-600">저</span> 기온
          </th>
          {/* <OnedayWeather2 data={data} category={'TMN'} text={'°C'} /> */}
        </tr>
        <tr className="bg-lightsand">
          <th className="border-2 h-[50px]">하늘 상태</th>
          {/* <OnedayWeather2 data={data} category={'SKY'} /> */}
        </tr>
        <tr>
          <th className="border-2 h-[50px]">강수 형태</th>
          {/* <OnedayWeather2 data={data} category={'PTY'} /> */}
        </tr>
        <tr>
          <th className="border-2 h-[50px] bg-lightsand">풍속</th>
          {/* <OnedayWeather2 data={data} category={'WSD'} text={'%'} /> */}
        </tr>
      </tbody>
    </table>
  );
}

WeatherTable2.propTypes = {
  // data: PropTypes.object.isRequired,
};
