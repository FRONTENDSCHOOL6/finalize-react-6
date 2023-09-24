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
  const sortedList = [...commentList].sort((a, b) => {
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
    <button
      key={`pageButton-${i + 1}`}
      onClick={() => setPage(i + 1)}
      disabled={page === i + 1}
      className={`px-2 rounded-full border-2 my-8 w-5 h-5 flex items-center justify-center ${
        page === i + 1 ? 'bg-blue' : 'bg-lightsand'
      } hover:border-blue`}
    ></button>
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
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover w-full h-full"
                  src={getPbImageURL(item, 'photo')}
                  alt={item.tag}
                />
              </figure>
              <figcaption className="text-white flex flex-col text-end absolute bottom-0 w-full p-3 bg-black/40">
                <span className="text-xl w-3/4 ellipsis ml-auto">
                  {item.title}
                </span>
                <span className="text-sm w-3/4 ellipsis ml-auto text-slate-300">
                  #{item.title}
                </span>
                <span>⭐({item.commentId.length})</span>
              </figcaption>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-row justify-center gap-3">{pageButtons}</div>
    </>
  );
}

MainContent.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
