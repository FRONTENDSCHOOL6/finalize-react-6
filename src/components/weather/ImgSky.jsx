import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { useEffect } from 'react';

export default function ImgSky({ data }) {
  // useEffect를 사용하여 data prop이 변경될 때마다 로그를 출력합니다.
  // useEffect(() => {
  //   console.log('data has changed:', data);
  // }, [data]);
  // console.log('data:', data);

  if (!data.response) {
    return (
      <div className="grid place-content-center h-[600px]">
        <Spinner size={160} />
      </div>
    );
  }
  // 하늘 상태
  const sky = data?.response?.body?.items?.item[5]?.fcstValue;
  let skySrc = '';
  let skyAlt = '';
  let skyText = '';

  if (sky <= 5) {
    skySrc =
      'https://frontendschool6.github.io/finalize-react-6/weather/clear.svg';
    skyAlt = '맑음';
    skyText = '맑음';
  } else if (sky >= 6 && sky <= 8) {
    skySrc =
      'https://frontendschool6.github.io/finalize-react-6/weather/partly_cloudy.svg';
    skyAlt = '구름 많음';
    skyText = '구름 많음';
  } else {
    skySrc =
      'https://frontendschool6.github.io/finalize-react-6/weather/cloudy.svg';
    skyAlt = '흐림';
    skyText = '흐림';
  }

  // 강수 형태
  const rain = data?.response?.body?.items?.item[6]?.fcstValue;
  console.log('rain:', rain);
  let rainSrc = '';
  let rainAlt = '';
  let rainText = '';

  if (rain === 1) {
    rainSrc =
      'https://frontendschool6.github.io/finalize-react-6/weather/rain.svg';
    rainAlt = '비';
    rainText = '비';
  } else if (rain === 2) {
    rainSrc =
      'https://frontendschool6.github.io/finalize-react-6/weather/snow.svg';
    rainAlt = '비 또는 눈';
    rainText = '비 또는 눈';
  } else if (rain === 3) {
    rainSrc =
      'https://frontendschool6.github.io/finalize-react-6/weather/snow.svg';
    rainAlt = '눈';
    rainText = '눈';
  } else if (rain === 4) {
    rainSrc =
      'https://frontendschool6.github.io/finalize-react-6/weather/rain.svg';
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
