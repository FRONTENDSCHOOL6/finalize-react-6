import { NavLink } from 'react-router-dom';
import { getPbImageURL } from '@/utils';
import PropTypes from 'prop-types';

export default function MainContent({ page, data }) {
  if (!data) {
    return <div>Loading...</div>;
  }

  // 댓글이 있는 항목만 선택
  const commentList = data?.filter((item) => item.commentId.length > 0) || [];

  // 댓글 수에 따라 내림차순으로 정렬, 그리고 동일한 댓글 수의 경우 최신 순으로 정렬
  const sortedList = commentList.sort((a, b) => {
    if (b.commentId.length !== a.commentId.length) {
      return b.commentId.length - a.commentId.length;
    } else {
      return new Date(b.created) - new Date(a.created);
    }
  });

  // 처음 9개 요소만 선택
  const nineItems = sortedList.slice(0, 9);

  // 전체 아이템 목록에서 현재 페이지에 해당하는 부분만 추출
  const itemsPerPage = 3;
  const startIndex = (page - 1) * itemsPerPage; // 현재 페이지의 첫 번째 아이템 인덱스
  const endIndex = startIndex + itemsPerPage; // 현재 페이지의 마지막 아이템 인덱스
  const currentPageItems = nineItems.slice(startIndex, endIndex);

  return (
    <>
      {currentPageItems?.map((item) => (
        <li
          key={item.id}
          className="w-1/3 border-2 border-slate-300 border-solid rounded"
        >
          <NavLink to={`/content/${item.id}`}>
            <figure className="relative h-64">
              <img
                src={getPbImageURL(item, 'photo')}
                alt={item.tag}
                className="absolute top-0 w-full h-4/5 object-cover"
              />
              {/* <figcaption className="absolute bottom-0 py-4 pl-4 overflow-hidden text-ellipsis whitespace-nowrap w-full bg-white opacity-75">
                {item.title}
              </figcaption> */}
              <figcaption className="absolute bottom-0 py-4 px-4 overflow-hidden text-ellipsis whitespace-nowrap w-full bg-white opacity-75 flex justify-content-between">
                <div style={{ width: '80%' }}>{item.title}</div>
                <span className="text-right" style={{ width: '20%' }}>
                  ⭐️ {item.commentId.length}
                </span>
              </figcaption>
            </figure>
          </NavLink>
        </li>
      ))}
    </>
  );
}

MainContent.propTypes = {
  page: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
