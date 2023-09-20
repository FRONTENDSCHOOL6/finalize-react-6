import Spinner from '../Spinner';
import OnedayWeather from './OnedayWeather';
import PropTypes from 'prop-types';

export default function WeatherTable({ data }) {
  if (!data.response) {
    return (
      <div className="grid place-content-center h-[600px]">
        <Spinner size={160} />
      </div>
    );
  }
  return (
    <>
      <table className="border-2 w-2/3 text-center">
        <thead className="border-2">
          <tr className="bg-lightsand">
            <th className="border-2 h-[50px]"></th>
            {data?.response?.body?.items?.item
              .filter((item) => {
                const hour = parseInt(item.fcstTime.slice(0, 2), 10); // 4자리로 표시되는 시간은 앞의 2자리만 정수로 추출
                return hour % 3 === 0 && item.category === 'TMP';
              })
              .slice(0, 8) // 8칸(24시간)만 랜더링
              .map((item) => {
                const hour = parseInt(item.fcstTime.slice(0, 2), 10);
                const time = `${hour}시`;
                return (
                  <th
                    key={`${item.fcstDate}-${item.fcstTime}`}
                    className="border-2"
                  >
                    {time}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody className="border-2">
          <tr>
            <th className="border-2 h-[50px]">기온</th>
            <OnedayWeather data={data} category={'TMP'} text={'°C'} />
          </tr>
          <tr className="bg-lightsand">
            <th className="border-2 h-[50px]">하늘 상태</th>
            <OnedayWeather data={data} category={'SKY'} />
          </tr>
          <tr>
            <th className="border-2 h-[50px]">습도</th>
            <OnedayWeather data={data} category={'REH'} text={'%'} />
          </tr>
          <tr className="bg-lightsand">
            <th className="border-2 h-[50px]">강수 형태</th>
            <OnedayWeather data={data} category={'PTY'} />
          </tr>
          <tr>
            <th className="border-2 h-[50px]">강수 확률</th>
            <OnedayWeather data={data} category={'POP'} text={'%'} />
          </tr>
          <tr className="bg-lightsand">
            <th className="border-2 h-[50px]">풍속</th>
            <OnedayWeather data={data} category={'WSD'} text={'m/s'} />
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

WeatherTable.propTypes = {
  data: PropTypes.object.isRequired,
};
