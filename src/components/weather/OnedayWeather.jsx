import PropTypes from 'prop-types';

export default function OnedayWeather({ data, category, text }) {
  if (!data.response) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {data?.response?.body?.items.item
        .filter((item) => {
          const hour = parseInt(item.fcstTime.slice(0, 2), 10);
          return hour % 3 === 0 && item.category === category;
        })
        .slice(0, 8)
        .map((item) => {
          let displayValue;
          if (category === 'SKY') {
            const result = parseInt(item.fcstValue);
            if (result <= 5) {
              displayValue = '맑음';
            } else if (result >= 6 && result <= 8) {
              displayValue = '구름 많음';
            } else if (result >= 9) {
              displayValue = '흐림';
            }
          } else if (category === 'PTY') {
            const result = parseInt(item.fcstValue);
            if (result === 0) {
              displayValue = '없음';
            } else if (result === 1) {
              displayValue = '비';
            } else if (result === 2) {
              displayValue = '비 또는 눈';
            } else if (result === 3) {
              displayValue = '눈';
            } else if (result === 4) {
              displayValue = '소나기';
            }
          } else {
            displayValue = `${parseInt(item.fcstValue)}${text}`;
          }

          return (
            <td key={`${item.fcstDate}-${item.fcstTime}`} className="border-2">
              {displayValue}
            </td>
          );
        })}
    </>
  );
}

OnedayWeather.propTypes = {
  data: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  text: PropTypes.string,
};
