import Spinner from '../Spinner';
import ImgSky from './ImgSky';
import WeatherTable from './WeatherTable';
import PropTypes from 'prop-types';

export default function GetWeather({ data }) {
  if (!data.response) {
    return (
      <div className="grid place-content-center h-[600px]">
        <Spinner size={160} />
      </div>
    );
  }
  return (
    <>
      <p className="text-5xl">
        {data?.response?.body?.items?.item[0]?.fcstValue}&deg;C
      </p>
      <ImgSky data={data} />
      <div>
        <span className="text-xl px-10">
          💧 습도 {data?.response?.body?.items?.item[10]?.fcstValue}%
        </span>
        <span className="text-xl px-10">
          ☔️ 강수확률 {data?.response?.body?.items?.item[7]?.fcstValue}%
        </span>
        <span className="text-xl px-10">
          🌪️ 풍속 {data?.response?.body?.items?.item[4]?.fcstValue}m/s
        </span>
      </div>
      <WeatherTable data={data} />
    </>
  );
}

GetWeather.propTypes = {
  data: PropTypes.object.isRequired,
};
