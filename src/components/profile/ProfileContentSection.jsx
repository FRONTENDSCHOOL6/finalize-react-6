import { getPbImageURL } from '@/utils';
import TitleButton from '../TitleButton';
import ContentItem from '../content/ContentItem';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import Spinner from '@/components/Spinner';
import { useSearchParams } from 'react-router-dom';

async function fetchContents(options) {
  let queryParams = '';
  queryParams = `?sort=${options.sort}&filter=${options.filter}&page=${options.page}&perPage=${options.perPage}`;
  const response = await fetch(
    `${import.meta.env.VITE_PB_API}/collections/${
      options.collection
    }/records${queryParams}`
  );
  return await response.json();
}

export default function ProfileContentSection({ showMore, setShowMore }) {
  const { user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [collection] = useState('content');
  const [page, setPage] = useState(() => {
    const page = searchParams.get('page');
    return page ? Number(page) : 1;
  });
  const [perPage] = useState(9);
  const [sort] = useState('-created');

  useEffect(() => {
    const page = searchParams.get('page');
    if (!page) setSearchParams({ page: 1 });
    if (page >= 2) setShowMore(true);
  }, [searchParams, setSearchParams, setShowMore]);

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['contents', sort, user, page, perPage, collection],
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
    <section className="mx-10 pt-10">
      <TitleButton
        title="나의 제주"
        link="#"
        count={data?.items?.length}
        section="게시글"
        onClick={() => setShowMore(!showMore)}
        showMore={showMore}
      />
      <hr />
      <ul className="my-10 w-11/12 mx-auto contentContainer">
        {data?.items?.length === 0 && <ContentItem />}
        {!showMore &&
          data?.items?.slice(0, 3).map((item) => {
            return (
              <ContentItem
                key={item.id}
                content={item.id}
                title={item.title}
                count={item.commentId.length}
                src={getPbImageURL(item, 'photo')}
              />
            );
          })}
        {showMore &&
          data?.items?.map((item) => {
            return (
              <ContentItem
                key={item.id}
                content={item.id}
                title={item.title}
                count={item.commentId.length}
                src={getPbImageURL(item, 'photo')}
              />
            );
          })}
      </ul>
      {(showMore || page >= 2) && (
        <section className="flex justify-center gap-5 my-10">
          <button
            onClick={() => {
              setPage((old) => Math.max(old - 1, 0));
              setSearchParams((searchParams) => {
                const page = searchParams.get('page');
                return { page: Number(page) - 1 };
              });
            }}
            disabled={page === 1}
            className="disabled:font-extralight font-bold"
          >
            <span className="sr-only">이전 페이지 이동</span>
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
              setSearchParams((searchParams) => {
                const page = searchParams.get('page');
                return { page: Number(page) + 1 };
              });
            }}
            disabled={page === data.totalPages || data.totalPages === 0}
            className="disabled:font-extralight font-bold"
          >
            <span className="sr-only">이후 페이지 이동</span>
            &gt;
          </button>
        </section>
      )}
    </section>
  );
}
