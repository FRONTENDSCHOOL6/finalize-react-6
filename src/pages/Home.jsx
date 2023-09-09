import MainContent from '@/components/MainContent';
import MainSlide from '@/components/MainSlide';
import TitleButton from '@/components/TitleButton';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Jeju - All in One</title>
      </Helmet>

      <section>
        <h2 className="sr-only">제주도 소개 슬라이드</h2>
        <MainSlide />
      </section>

      <section className="m-10">
        <TitleButton title="우리의 제주의 별" link="content" />
        <ul className="flex grow gap-5">
          <MainContent
            src="/jejuImage1.jpg"
            alt="메밀꽃밭"
            title="제주 메밀꽃"
          />
        </ul>
        <button className="flex mx-auto mt-10 rounded-full bg-lightsand px-6 py-3 border-2 border-blue">
          <Link to="content/create">
            <span className="text-blue font-extrabold text-lg">
              나만의 제주를 우리의 제주로
            </span>
          </Link>
        </button>
      </section>
    </>
  );
}
