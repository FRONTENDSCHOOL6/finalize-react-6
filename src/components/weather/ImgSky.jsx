import PropTypes from 'prop-types';

export default function ImgSky({ data }) {
  if (!data.response) {
    return <div>Loading...</div>;
  }
  // 하늘 상태
  const sky = data?.response?.body?.items?.item[5]?.fcstValue;
  let skySrc = '';
  let skyAlt = '';
  let skyText = '';

  if (sky <= 5) {
    skySrc = '/weather/clear.svg';
    skyAlt = '맑음';
    skyText = '맑음';
  } else if (sky >= 6 && sky <= 8) {
    skySrc = '/weather/partly cloudy.svg';
    skyAlt = '구름 많음';
    skyText = '구름 많음';
  } else {
    skySrc = '/weather/cloudy.svg';
    skyAlt = '흐림';
    skyText = '흐림';
  }

  // 강수 형태
  const rain = data?.response?.body?.items?.item[6]?.fcstValue;
  let rainSrc = '';
  let rainAlt = '';
  let rainText = '';

  if (rain === 1) {
    rainSrc = '/weather/rain.svg';
    rainAlt = '비';
    rainText = '비';
  } else if (rain === 2) {
    rainSrc = '/weather/snow.svg';
    rainAlt = '비와 눈';
    rainText = '비와 눈';
  } else if (rain === 3) {
    rainSrc = '/weather/snow.svg';
    rainAlt = '눈';
    rainText = '눈';
  } else if (rain === 4) {
    rainSrc = '/weather/rain.svg';
    rainAlt = '소나기';
    rainText = '소나기';
  }

  return (
    <div className="flex gap-24  justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <img src={skySrc} alt={skyAlt} className="w-[120px] h-[120px]" />
        {skyText}
      </div>
      {rain !== 0 && rainSrc && (
        <div className="flex flex-col justify-center items-center">
          <img src={rainSrc} alt={rainAlt} className="w-[120px] h-[120px]" />
          {rainText}
        </div>
      )}
    </div>
  );
}

ImgSky.propTypes = {
  data: PropTypes.object.isRequired,
};
