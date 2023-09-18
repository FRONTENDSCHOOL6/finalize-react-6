import pb from '@/api/pocketbase';
import MainContent from '@/components/MainContent';
import MainSlide from '@/components/MainSlide';
import MainTag from '@/components/MainTag';
import Spinner from '@/components/Spinner';
import TitleButton from '@/components/TitleButton';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Home() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('pending');
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    async function getContentList() {
      try {
        setStatus('loading');
        const contentList = await pb.collection('content').getFullList({
          expand: 'comment',
        });
        setData(contentList);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    }

    getContentList();
  }, [page]);

  if (!data) {
    return (
      <div className="grid place-content-center h-[600px]">
        <Spinner size={160} />
      </div>
    );
  }

  const filteredData = selectedTag
    ? data.filter((item) => item.tag === selectedTag)
    : data;

  return (
    <>
      <Helmet>
        <title>Jeju - All in One</title>
      </Helmet>

      <section>
        <h2 className="sr-only">제주도 소개 슬라이드</h2>
        <MainSlide />
      </section>

      <section className="my-28 mx-10 relative">
        <TitleButton title="우리의 제주의 별" link="content/list" />
        <MainTag data={data} onTagClick={setSelectedTag} setPage={setPage} />
        <ul className="contentContainer mt-4">
          <MainContent page={page} data={filteredData} setPage={setPage} />
        </ul>

        {/* <div className="flex flex-row justify-center gap-3">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              disabled={page === num}
              className="bg-lightsand px-2 rounded-full border-2 my-8 w-5 h-5 flex items-center justify-center hover:border-blue"
            ></button>
          ))}
        </div> */}

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
