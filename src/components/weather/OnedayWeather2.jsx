import PropTypes from 'prop-types';

export default function OnedayWeather2({ data, category, text }) {
  console.log('data:', data);
  if (!data.response) {
    return <div>Loading...</div>;
  }

  // TMN 카테고리 아이템 가져오기
  // const tmnItems = data?.response?.body?.items?.item.filter(item => item.category === 'TMN').slice(0, 3);

  // baseTime이 '0200'인 아이템과 특정 카테고리에 해당하는 아이템 가져오기
  // const filteredItems = data?.response?.body?.items.item.filter(
  //   (item) => item.fcstTime === '0200' && item.category === category
  // );

  return (
    <>
      {/* {filteredItems} */}
      {/* {filteredItems.map((item) => {
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
          displayValue = `${parseInt(item.fcstvalue)}${text}`;
        }

        return (
          <td key={`${item.fcstdate}-${item.fcsstime}`} className="border-2">
            {displayValue}
          </td>
        );
      })} */}
    </>
    // <>
    //   {data?.response?.body?.items.item
    //     .filter((item) => {
    //       return baseTime && item.category === category;
    //     })
    //     .slice(0, 8)
    //     .map((item) => {
    //       let displayValue;
    //       if (category === 'SKY') {
    //         const result = parseInt(item.fcstValue);
    //         if (result <= 5) {
    //           displayValue = '맑음';
    //         } else if (result >= 6 && result <= 8) {
    //           displayValue = '구름 많음';
    //         } else if (result >= 9) {
    //           displayValue = '흐림';
    //         }
    //       } else if (category === 'PTY') {
    //         const result = parseInt(item.fcstValue);
    //         if (result === 0) {
    //           displayValue = '없음';
    //         } else if (result === 1) {
    //           displayValue = '비';
    //         } else if (result === 2) {
    //           displayValue = '비 또는 눈';
    //         } else if (result === 3) {
    //           displayValue = '눈';
    //         } else if (result === 4) {
    //           displayValue = '소나기';
    //         }
    //       } else {
    //         displayValue = `${parseInt(item.fcstValue)}${text}`;
    //       }

    //       return (
    //         <td key={`${item.fcstDate}-${item.fcstTime}`} className="border-2">
    //           {displayValue}
    //         </td>
    //       );
    //     })}
    // </>
  );
}

OnedayWeather2.propTypes = {
  data: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  text: PropTypes.string,
};
