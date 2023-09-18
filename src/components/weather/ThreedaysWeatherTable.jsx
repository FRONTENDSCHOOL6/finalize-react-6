import PropTypes from 'prop-types';
import ThreedaysWeather from './ThreedaysWeather';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ThreedaysWeatherTable({ coordinates }) {
  const [data, setData] = useState({});
  useEffect(() => {
    const baseUrl =
      'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
    const serviceKey = process.env.VITE_WEATHER_API_KEY;

    // 날짜
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    let baseDate = `${year}${month}${day}`;
    const hour = today.getHours();
    if (hour < 2) {
      // 새벽 2시 이전인 경우 전날 23시로 baseTime 설정
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const prevDayYear = yesterday.getFullYear();
      const prevDayMonth = String(yesterday.getMonth() + 1).padStart(2, '0');
      const prevDayDate = String(yesterday.getDate()).padStart(2, '0');

      baseDate = `${prevDayYear}${prevDayMonth}${prevDayDate}`;
    }

    async function fetchWeatherData() {
      const { x, y } = coordinates;
      const url = `${baseUrl}?serviceKey=${serviceKey}&pageNo=1&numOfRows=1500&dataType=JSON&base_date=${baseDate}&base_time=0200&nx=${x}&ny=${y}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchWeatherData();
  }, [coordinates]);

  return (
    <>
      <table className="border-2 w-2/3 text-center text-xl">
        <thead className="border-2">
          <tr className="bg-lightsand">
            <th className="border-2 h-[50px]"></th>
            {data?.response?.body?.items?.item
              .filter((item) => {
                if (item.fcstDate && item.category === 'TMX') {
                  return true;
                }
                return false;
              })
              .map((item) => {
                const month = parseInt(item.fcstDate.slice(4, 6), 10);
                const day = parseInt(item.fcstDate.slice(6), 10);
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
            {data && (
              <ThreedaysWeather data={data} category={'TMX'} text={'°C'} />
            )}
          </tr>
          <tr>
            <th className="border-2 h-[50px]">
              최<span className="text-sky-600">저</span> 기온
            </th>
            <ThreedaysWeather data={data} category={'TMN'} text={'°C'} />
          </tr>
          <tr className="bg-lightsand">
            <th className="border-2 h-[50px]">하늘 상태</th>
            <ThreedaysWeather data={data} category={'SKY'} />
          </tr>
          <tr>
            <th className="border-2 h-[50px]">습도</th>
            <ThreedaysWeather data={data} category={'REH'} text={'%'} />
          </tr>
          <tr className=" bg-lightsand">
            <th className="border-2 h-[50px]">강수 형태</th>
            <ThreedaysWeather data={data} category={'PTY'} />
          </tr>
          <tr>
            <th className="border-2 h-[50px]">강수 확률</th>
            <ThreedaysWeather data={data} category={'POP'} text={'%'} />
          </tr>
          <tr className="bg-lightsand">
            <th className="border-2 h-[50px]">풍속</th>
            <ThreedaysWeather data={data} category={'WSD'} text={'m/s'} />
          </tr>
        </tbody>
      </table>
      <span className="w-2/3 text-right mt-[-30px]">
        풍속: 4미만(약함), 4이상 9미만(약간 강함), 9이상 14미만(강함),
        14이상(매우강함)
      </span>
    </>
  );
}

ThreedaysWeatherTable.propTypes = {
  coordinates: PropTypes.object.isRequired,
};
