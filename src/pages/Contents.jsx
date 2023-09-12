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

async function fetchContents(options) {
  let queryParams = '';

  if (options.filter === `(tag='')`) {
    queryParams = `?sort=${options.sort}`;
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
  const [sort, setSort] = useState('-created');
  const [tag, setTag] = useState('');

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['contents', sort, tag],
    queryFn: () => fetchContents({ sort, filter: `(tag='${tag}')` }),
  });

  const handleTagSelect = (e) => {
    if (e.target.value) setTag(e.target.value);
    else setTag('');
  };

  if (isLoading) {
    return <div className="grid place-content-center h-full">로딩 중</div>;
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
              <p className="font-extrabold text-lg ">⭐을 나눠주기</p>
              <img src={right} alt="register" className="" />
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
            {colourOptions.map((item) => (
              <option value={item.value} key={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
        <section className="contentContainer p-1 bg-gray-100 min-h-[100vh] w-11/12">
          {data?.items?.map((item) => {
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
        </section>

        <section className="flex justify-center my-20">
          <button type="button" className="px-4 text-gray-400 text-xl">
            &lt;
          </button>
          {/* 추후 api 통신하면서 수정 */}
          <div>1 2 3</div>
          <button type="button" className="px-4 text-gray-400 text-xl">
            &gt;
          </button>
        </section>
      </div>
    </>
  );
}
