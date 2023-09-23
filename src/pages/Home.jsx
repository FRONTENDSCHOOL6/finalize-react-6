import pb from '@/api/pocketbase';
import MainContent from '@/components/MainContent';
import MainSlide from '@/components/MainSlide';
import MainTag from '@/components/MainTag';
import PageHead from '@/components/PageHead';
import Spinner from '@/components/Spinner';
import TitleButton from '@/components/TitleButton';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';

async function getContentList() {
  try {
    const contentList = await pb.collection('content').getFullList({
      expand: 'comment',
    });
    return contentList; // 쿼리 함수에서 데이터를 반환
  } catch (error) {
    console.log(error);
  }
}

export default function Home() {
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['mainContents'],
    queryFn: getContentList,
    staleTime: 60 * 60 * 1000,
  });

  if (isLoading) {
    return <Spinner className="mx-auto" />;
  }

  if (isError) {
    return <div role="alert">{error.toString()}</div>;
  }

  const filteredData = selectedTag
    ? data.filter((item) => item.tag === selectedTag)
    : data;

  return (
    <>
      <PageHead title="Jeju All in One - 나만의 제주" />
      <section>
        <h2 className="sr-only">제주도 소개 슬라이드</h2>
        <MainSlide />
      </section>

      <section className="my-28 mx-10 relative">
        <TitleButton title="우리의 제주의 별" link="content/list" />
        <MainTag
          data={data}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          setPage={setPage}
        />
        <MainContent page={page} data={filteredData} setPage={setPage} />

        <button
          className="flex mx-auto mt-10 rounded-full bg-lightsand px-6 py-3 border-2 text-blue border-blue
        hover:bg-darkblue hover:text-lightsand transform transition-all"
        >
          <Link to="content/create">
            <span className="font-extrabold text-lg">
              나만의 제주를 우리의 제주로
            </span>
          </Link>
        </button>
      </section>
    </>
  );
}
