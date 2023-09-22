import PropTypes from 'prop-types';
import ThreedaysWeather from './ThreedaysWeather';
import { useQuery } from '@tanstack/react-query';

async function fetchWeatherData(coordinates) {
  const baseUrl =
    'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
  const serviceKey = import.meta.env.VITE_WEATHER_API_KEY;

  // 날짜
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  let baseDate = `${year}${month}${day}`;

  // 새벽 2시 이전인 경우 전날 23시로 baseTime 설정
  const hour = today.getHours();
  if (hour < 2) {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const prevDayYear = yesterday.getFullYear();
    const prevDayMonth = String(yesterday.getMonth() + 1).padStart(2, '0');
    const prevDayDate = String(yesterday.getDate()).padStart(2, '0');
    baseDate = `${prevDayYear}${prevDayMonth}${prevDayDate}`;
  }

  const { x, y } = coordinates;
  const url = `${baseUrl}?serviceKey=${serviceKey}&pageNo=1&numOfRows=1500&dataType=JSON&base_date=${baseDate}&base_time=0200&nx=${x}&ny=${y}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default function ThreedaysWeatherTable({ coordinates }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['threeDaysWeatherData', coordinates], // queryKey: 쿼리를 고유하게 식별. 이 배열은 쿼리의 이름과, coordinates 객체의 값에 따라 각각의 쿼리를 구분함
    queryFn: () => fetchWeatherData(coordinates),
    enabled: !!coordinates, // coordinates가 변경될 때만 데이터 가져옴 (enabled는 true 또는 false이지, 변수의 값을 가질 수 없음)
    staleTime: 60 * 60 * 1000, // 60분(1시간)을 밀리초로 변환
  });

  if (data) {
    return (
      <>
        <table className="border-2 w-2/3 text-center">
          <caption className="sr-only">3일치 날씨 정보</caption>
          <thead className="border-2">
            <tr className="bg-lightsand">
              <th className="border-2 h-[50px]" scope="row"></th>
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
                      scope="row"
                    >
                      {`${month}/${day}`}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody className="border-2">
            <tr>
              <th className="border-2 h-[50px]" scope="col">
                최<span className="text-red-600">고</span> 기온
              </th>
              {data && (
                <ThreedaysWeather data={data} category={'TMX'} text={'°C'} />
              )}
            </tr>
            <tr>
              <th className="border-2 h-[50px]" scope="col">
                최<span className="text-sky-600">저</span> 기온
              </th>
              <ThreedaysWeather data={data} category={'TMN'} text={'°C'} />
            </tr>
            <tr className="bg-lightsand">
              <th className="border-2 h-[50px]" scope="col">
                하늘 상태
              </th>
              <ThreedaysWeather data={data} category={'SKY'} />
            </tr>
            <tr>
              <th className="border-2 h-[50px]" scope="col">
                습도
              </th>
              <ThreedaysWeather data={data} category={'REH'} text={'%'} />
            </tr>
            <tr className=" bg-lightsand">
              <th className="border-2 h-[50px]" scope="col">
                강수 형태
              </th>
              <ThreedaysWeather data={data} category={'PTY'} />
            </tr>
            <tr>
              <th className="border-2 h-[50px]" scope="col">
                강수 확률
              </th>
              <ThreedaysWeather data={data} category={'POP'} text={'%'} />
            </tr>
            <tr className="bg-lightsand">
              <th className="border-2 h-[50px]" scope="col">
                풍속
              </th>
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
}

ThreedaysWeatherTable.propTypes = {
  coordinates: PropTypes.object.isRequired,
};
