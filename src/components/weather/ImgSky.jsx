export default function ImgSky({ data }) {
  // 하늘 상태
  const sky = data?.response?.body?.items?.item[5]?.fcstValue;
  let skySrc = '';
  let skyAlt = '';

  if (sky <= 5) {
    skySrc = '/weather/clear.svg';
    skyAlt = '맑음';
  } else if (sky >= 6 && sky <= 8) {
    skySrc = '/weather/partly cloudy.svg';
    skyAlt = '구름 많음';
  } else {
    skySrc = '/weather/cloudy.svg';
    skyAlt = '흐림';
  }

  // 강수 형태
  const rain = data?.response?.body?.items?.item[6]?.fcstValue;
  let rainSrc = '';
  let rainAlt = '';

  if (rain === 1) {
    rainSrc = '/weather/rain.svg';
    rainAlt = '비';
  } else if (rain === 2) {
    rainSrc = '/public/weather/rainSnow.png';
    rainAlt = '비와 눈';
  } else if (rain === 3) {
    rainSrc = '/weather/snow.svg';
    rainAlt = '눈';
  } else if (rain === 4) {
    rainSrc = '/weather/rain.png';
    rainAlt = '소나기';
  }

  return (
    <div className="flex gap-24">
      <img src={skySrc} alt={skyAlt} className="w-[100px] h-[100px]" />
      {rain !== 0 && rainSrc && (
        <img src={rainSrc} alt={rainAlt} className="w-[100px] h-[100px]" />
      )}
    </div>
  );
}
