import { getPbImageURL } from '@/utils';
import TitleButton from '../TitleButton';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import ProfileComment from '../ProfileComment';
import Spinner from '@/components/Spinner';

async function fetchContents(options) {
  let queryParams = '';
  queryParams = `?sort=${options.sort}&filter=${options.filter}&expand=contentId&page=${options.page}&perPage=${options.perPage}`;
  const response = await fetch(
    `${import.meta.env.VITE_PB_API}/collections/${
      options.collection
    }/records${queryParams}`
  );
  return await response.json();
}

export default function ProfileCommentSection({ showMore, setShowMore }) {
  const { user } = useAuthStore();
  const [collection, setCollection] = useState('comment');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [sort, setSort] = useState('-created');

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['comment', sort, user, page, perPage, collection],
    queryFn: () =>
      fetchContents({
        sort,
        filter: `userId='${user.id}'`,
        page,
        perPage,
        collection,
      }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Spinner className="mx-auto" />;
  }

  if (isError) {
    return <div role="alert">{error.toString()}</div>;
  }

  return (
    <section className="mx-10 mb-12">
      <TitleButton
        title="나의 제주의 별"
        link="#"
        count={data?.items?.length}
        section="댓글"
        onClick={() => setShowMore(!showMore)}
        showMore={showMore}
      />
      <hr />
      <ul className="w-11/12 mx-auto my-10">
        {data?.items?.length === 0 && (
          <>
            <Link to="/content">
              <ProfileComment
                src="https://frontendschool6.github.io/finalize-react-6/jejuImage5.jpg"
                alt="제주 바다"
                date="2023-09-06"
                comment="제주를 향한 당신의 별을 우리에게 나누어주세요"
              />
            </Link>
          </>
        )}
        {!showMore &&
          data?.items?.slice(0, 5).map((item) => {
            return (
              <Link to={`/content/${item.contentId}`} key={item.id}>
                <ProfileComment
                  src={getPbImageURL(item.expand.contentId, 'photo')}
                  alt={item.title}
                  date={item.created.split(' ')[0]}
                  comment={item.comment}
                />
              </Link>
            );
          })}
        {showMore &&
          data?.items?.map((item) => {
            return (
              <Link to={`/content/${item.contentId}`} key={item.id}>
                <ProfileComment
                  src={getPbImageURL(item.expand.contentId, 'photo')}
                  alt={item.title}
                  date={item.created.split(' ')[0]}
                  comment={item.comment}
                />
              </Link>
            );
          })}
      </ul>
      {showMore && (
        <section className="flex justify-center gap-5 my-10">
          <button
            onClick={() => {
              setPage((old) => Math.max(old - 1, 0));
              window.scrollTo(0, 0);
            }}
            disabled={page === 1}
            className="disabled:font-extralight font-bold"
          >
            &lt;
          </button>
          <span>
            {`${page}`}
            {data.totalPages !== 1 &&
              data.totalPages !== 0 &&
              ` / ${data.totalPages}`}
          </span>
          <button
            onClick={() => {
              setPage((old) => old + 1);
              window.scrollTo(0, 0);
            }}
            disabled={page === data.totalPages || data.totalPages === 0}
            className="disabled:font-extralight font-bold"
          >
            &gt;
          </button>
        </section>
      )}
    </section>
  );
}
