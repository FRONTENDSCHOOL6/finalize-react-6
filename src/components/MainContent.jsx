import { NavLink } from 'react-router-dom';
import pb from '@/api/pocketbase';
import { useState, useEffect } from 'react';
import { getPbImageURL } from '@/utils';

export default function MainContent({ src, alt, title }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('pending');
  const [page, setPage] = useState(1); // 현재 페이지 번호
  // const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    async function getContentList() {
      try {
        setStatus('loading');
        const contentList = await pb.collection('content').getFullList({
          expand: 'comment',
        });

        // 댓글이 있는 항목만 선택
        const commentList = contentList.filter(
          (item) => item.commentId.length > 0
        );

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

        console.log('currentPageItems:', currentPageItems);
        // setData(contentList);
        setData(currentPageItems);
        setStatus('success');
        // setTotalItems(contentList.totalItems); // API 응답에서 total 값 업데이트
      } catch (error) {
        setStatus('error');
      }
    }

    getContentList();
  }, [page]);

  return (
    <>
      {data?.map((item) => (
        <li
          key={item.id}
          className="w-1/3 border-2 border-slate-300 border-solid rounded"
        >
          <NavLink to="/content">
            <figure className="">
              <img src={getPbImageURL(item, 'photo')} alt={item.tag} />

              <figcaption className="py-4 pl-4 overflow-hidden text-ellipsis whitespace-nowrap">
                {item.title}
              </figcaption>
            </figure>
          </NavLink>
        </li>
      ))}

      {/* Pagination Controls */}
      <button
        onClick={() => setPage((prevPage) => prevPage - 1)}
        disabled={page === 1}
      >
        Previous Page
      </button>

      <span>Page: {page}</span>

      <button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        disabled={page === 3}
      >
        Next Page
      </button>
    </>
  );
}
