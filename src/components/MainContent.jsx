import { getPbImageURL } from '@/utils';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

export default function MainContent({ page, setPage, data }) {
  if (!data) {
    return (
      <div className="grid place-content-center h-[600px]">
        <Spinner size={160} />
      </div>
    );
  }

  // 댓글이 있는 항목만 선택
  const commentList = data?.filter((item) => item.commentId.length > 0) || [];

  // 댓글 수에 따라 내림차순, 그리고 최신 순으로 9개 정렬
  const sortedList = commentList.sort((a, b) => {
    if (b.commentId.length !== a.commentId.length) {
      return b.commentId.length - a.commentId.length;
    } else {
      return new Date(b.created) - new Date(a.created);
    }
  });
  const nineItems = sortedList.slice(0, 9);

  // 현재 페이지에 보여줄 아이템 수는 3개
  const itemsPerPage = 3;
  const totalItems = nineItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 현재 페이지의 아이템을 추출
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentPageItems = nineItems.slice(startIndex, endIndex);

  // 페이지 버튼을 생성
  const pageButtons = Array.from({ length: totalPages }, (_, i) => (
    <div
      className="flex flex-row justify-center gap-3"
      key={`pageButton-${i + 1}`}
    >
      <button
        onClick={() => setPage(i + 1)}
        disabled={page === i + 1}
        className="bg-lightsand px-2 rounded-full border-2 my-8 w-5 h-5 flex items-center justify-center hover:border-blue"
      >
        {/* {i + 1} */}
      </button>
    </div>
  ));

  return (
    <>
      <ul className="contentContainer mt-4">
        {currentPageItems?.map((item) => (
          <li
            key={item.id}
            className="relative border-2 border-slate-300 border-solid rounded"
          >
            <Link to={`/content/${item.id}`}>
              <figure className="imageContainer brightness-[0.85] overflow-hidden">
                <img
                  src={getPbImageURL(item, 'photo')}
                  alt={item.tag}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover w-full h-full"
                />

                <figcaption className="absolute bottom-0 py-4 px-4 overflow-hidden text-ellipsis whitespace-nowrap w-full bg-white opacity-75 flex justify-content-between">
                  <div className="ellipsis w-4/5">{item.title}</div>
                  <span className="text-right" style={{ width: '20%' }}>
                    ⭐️ {item.commentId.length}
                  </span>
                </figcaption>
              </figure>
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex flex-row justify-center gap-3">{pageButtons}</div>
    </>
  );
}

MainContent.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
