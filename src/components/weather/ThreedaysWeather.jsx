import PropTypes from 'prop-types';

export default function OnedayWeather2({ data, category, text }) {
  if (!data.response) {
    return <div>Loading...</div>;
  }

  const filteredItems = data?.response?.body?.items.item.filter(
    (item) =>
      (category === 'TMN'
        ? item.fcstTime === '0600'
        : item.fcstTime === '1500') && item.category === category
  );

  return (
    <>
      {filteredItems.map((item) => {
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
          } else {
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

OnedayWeather2.propTypes = {
  data: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  text: PropTypes.string,
};
