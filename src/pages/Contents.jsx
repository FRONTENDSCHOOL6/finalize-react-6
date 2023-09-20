import right from '@/assets/right.svg';
import rightWhite from '@/assets/rightWhite.svg';
import ContentItem from '@/components/content/ContentItem';
import ContentTitle from '@/components/content/ContentTitle';
import PageHead from '@/components/PageHead';
import { useQuery } from '@tanstack/react-query';
import { getPbImageURL } from '@/utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { colourOptions } from '@/components/content/data/data';
import Spinner from '@/components/Spinner';
import { usePageStore } from '@/store/usePageStore';

async function fetchContents(options) {
  let queryParams = '';

  if (options.filter === `(tag='')`) {
    queryParams = `?sort=${options.sort}&page=${options.page}&perPage=${options.perPage}`;
  } else {
    queryParams = `?${Object.entries(options)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')}`;
  }

  const response = await fetch(
    `${import.meta.env.VITE_PB_API}/collections/content/records${queryParams}`
  );
  return await response.json();
}

export default function Contents() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);

  const pageNum = usePageStore((state) => state.page);
  const setPageNum = usePageStore((state) => state.handlePage);

  const [sort, setSort] = useState('-created');
  const [tag, setTag] = useState('');

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['contents', sort, tag, page, perPage],
    queryFn: () =>
      fetchContents({ sort, filter: `(tag='${tag}')`, page, perPage }),
    keepPreviousData: true,
  });

  const handleTagSelect = (e) => {
    setTag(e.target.value);
    setPage(1);
  };

  if (isLoading) {
    return <Spinner className="mx-auto" />;
  }

  if (isError) {
    return <div role="alert">{error.toString()}</div>;
  }

  return (
    <>
      <PageHead title="Jeju All in One - 나만의 제주" />

      <div className="flex flex-col justify-center items-center">
        <section className="text-center">
          <ContentTitle title="우리의 제주" />
          <p className="mt-3">
            ⭐로 우리에게 나누어진 &lsquo;우리의 제주&rsquo;를 둘러보세요.
          </p>

          <Link to="/content/create">
            <button
              type="button"
              className="my-5 inline-flex text-blue rounded-full items-center bg-lightsand gap-2 px-6 py-3 border-2 border-blue
              hover:bg-darkblue hover:text-lightsand transform transition-all"
              onMouseOver={(e) =>
                (e.currentTarget.children[1].src = rightWhite)
              }
              onMouseOut={(e) => (e.currentTarget.children[1].src = right)}
            >
              <p className="font-extrabold text-lg">⭐ 나눠주기</p>
              <img src={right} alt="링크 화살표" />
            </button>
          </Link>
        </section>

        <div className="w-11/12 text-right mb-5">
          <button onClick={() => setTag('')} type="button" className="mr-2">
            모아보기
          </button>
          <select
            name="태그"
            id="tagSelect"
            onChange={handleTagSelect}
            value={tag}
          >
            <option>- 태그 -</option>
            {colourOptions.map((item) => (
              <option value={item.value} key={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
        <section className="contentContainer p-1 bg-gray-100 w-11/12">
          {data.items.length === 0 && <ContentItem />}
          {data?.items?.map((item) => {
            return (
              <ContentItem
                key={item.id}
                content={item.id}
                title={item.title}
                count={item.commentId.length}
                customTag={item.customTag}
                src={getPbImageURL(item, 'photo')}
              />
            );
          })}
        </section>

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
            {/* {`${pageNum}`} */}
            {data.totalPages !== 1 &&
              data.totalPages !== 0 &&
              ` / ${data.totalPages}`}
          </span>
          <button
            onClick={() => {
              setPage((old) => old + 1);
              // setPageNum(pageNum);
              window.scrollTo(0, 0);
            }}
            disabled={page === data.totalPages || data.totalPages === 0}
            // disabled={pageNum === data.totalPages || data.totalPages === 0}
            className="disabled:font-extralight font-bold"
          >
            &gt;
          </button>
        </section>
      </div>
    </>
  );
}
