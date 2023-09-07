export default function GetWeather() {
  return (
    <>
      <p className="text-5xl">기온 25&deg;C</p>
      <img
        src="/public/weather/clear.svg"
        alt="맑음"
        className="w-[100px] h-[100px]"
      />
      <div>
        <span className="text-xl px-10">강수확률 0%</span>
        <span className="text-xl px-10">풍속 3m/s</span>
      </div>
    </>
  );
}
