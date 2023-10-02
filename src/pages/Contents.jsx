import right from '@/assets/right.svg';
import rightWhite from '@/assets/rightWhite.svg';
import ContentItem from '@/components/content/ContentItem';
import ContentTitle from '@/components/content/ContentTitle';
import Spinner from '@/components/Spinner';
import PageHead from '@/components/PageHead';
import { getPbImageURL } from '@/utils';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { colourOptions } from '@/components/content/data/data';
import { fetchContents } from '@/utils/fetchContents';
import PaginationButton from '@/components/PaginationButton';

export default function Contents() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const [page, setPage] = useState(() => {
    const page = searchParams.get('page');
    return page ? Number(page) : 1;
  });

  const [sort] = useState('-created');
  const [perPage] = useState(9);
  const [tag, setTag] = useState('');

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['contents', sort, tag, page, perPage],
    queryFn: () =>
      fetchContents({ sort, filter: `(tag='${tag}')`, page, perPage }),
    keepPreviousData: true,
  });

  useEffect(() => {
    let page = searchParams.get('page');
    if (!page) setSearchParams({ page: 1 });

    if (+page < data?.totalPages) {
      page++;
    } else {
      page = data?.totalPages;
    }

    async () => {
      await queryClient.prefetchQuery({
        queryKey: ['contents', sort, tag, page, perPage],
        queryFn: fetchContents({
          sort,
          filter: `(tag='${tag}')`,
          page,
          perPage,
        }),
      });
    };
  }, [
    searchParams,
    setSearchParams,
    sort,
    tag,
    perPage,
    queryClient,
    data?.totalPages,
  ]);

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
      <PageHead title="Jeju All in One - 우리의 제주" />

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

        <section className="w-11/12 text-right mb-5">
          <button
            onClick={() => {
              setTag('');
              setPage(1);
              setSearchParams({ page: 1 });
            }}
            type="button"
            className="mr-2"
          >
            모아보기
          </button>
          <select
            name="태그"
            id="tagSelect"
            onChange={handleTagSelect}
            className="dark:bg-transparent"
            value={tag}
          >
            <option className="dark:bg-slate-500">- 태그 -</option>
            {colourOptions.map((item) => (
              <option
                value={item.value}
                key={item.value}
                className="dark:bg-slate-500"
              >
                {item.value}
              </option>
            ))}
          </select>
        </section>
        <section className="contentContainer p-1 bg-gray-100 w-11/12 dark:bg-slate-400">
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

        <PaginationButton
          totalPages={data.totalPages}
          page={page}
          setPage={setPage}
          setSearchParams={setSearchParams}
        />
      </div>
    </>
  );
}
