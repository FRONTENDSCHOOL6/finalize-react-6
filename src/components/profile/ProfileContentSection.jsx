import { getPbImageURL } from '@/utils';
import TitleButton from '../TitleButton';
import ContentItem from '../content/ContentItem';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';

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
  const [collection, setCollection] = useState('content');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [sort, setSort] = useState('-created');

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
