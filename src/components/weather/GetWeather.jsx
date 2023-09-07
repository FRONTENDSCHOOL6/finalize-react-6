import ImgSky from './ImgSky';

export default function GetWeather({ data }) {
  return (
    <>
      <p className="text-5xl">
        기온 {data?.response?.body?.items?.item[0]?.fcstValue}
      </p>
      <ImgSky data={data} />
      <div>
        <span className="text-xl px-10">
          강수확률 {data?.response?.body?.items?.item[7]?.fcstValue}%
        </span>
        <span className="text-xl px-10">
          풍속 {data?.response?.body?.items?.item[4]?.fcstValue}m/s
        </span>
      </div>
    </>
  );
}
