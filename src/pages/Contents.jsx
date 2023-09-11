import right from '@/assets/right.svg';
import ContentItem from '@/components/content/ContentItem';
import ContentTitle from '@/components/content/ContentTitle';
import PageHead from '@/components/PageHead';
import { useQuery } from '@tanstack/react-query';
import { getPbImageURL } from '@/utils';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

async function fetchContents() {
  const response = await fetch(
    `${import.meta.env.VITE_PB_API}/collections/content/records`
  );
  return await response.json();
}

export default function Contents() {
  const { isLoading, data, isError, error } = useQuery(
    ['contents'],
    fetchContents,
    {
      staleTime: 1000 * 60 * 60,
      select: (array) =>
        array.items.sort((a, b) => {
          if (a.created > b.created) return -1;
          if (a.created < b.created) return 1;
          return 0;
        }),
    }
  );

  useEffect(() => {});

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
              className="my-5 inline-flex rounded-full items-center bg-lightsand gap-2 px-6 py-3 border-2 border-blue"
            >
              <p className="text-blue font-extrabold text-lg">
                추억을 공유하기
              </p>
              <img src={right} alt="register" />
            </button>
          </Link>
        </section>

        <div className="flex gap-2 ml-auto mr-[10%]">
          <button>최신순</button>
          <button>인기순</button>
          <button>태그</button>
        </div>
        <section className="contentContainer p-1 mx-auto bg-gray-100">
          {data?.map((item) => (
            <ContentItem
              key={item.id}
              content={item.id}
              title={item.title}
              count={item.commentId.length}
              src={getPbImageURL(item, 'photo')}
            />
          ))}
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
