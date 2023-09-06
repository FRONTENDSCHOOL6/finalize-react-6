import MainContent from '@/components/MainContent';
import MainSlide from '@/components/MainSlide';
import TitleButton from '@/components/TitleButton';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <section>
        <h2 className="sr-only">제주도 소개 슬라이드</h2>
        <MainSlide src="/mainSlide1.jpg" alt="제주도 바다" />
      </section>

      <section className="m-10">
        <TitleButton title="우리의 제주의 별" link="content" />
        <ul className="flex grow gap-5">
          <MainContent
            src="/jejuImage1.jpg"
            alt="메밀꽃밭"
            title="제주 메밀꽃"
          />
          <MainContent src="/jejuImage4.jpg" alt="돌담" title="제주 돌담" />
          <MainContent
            src="/jejuImage3.jpg"
            alt="한라봉 과수원"
            title="제주는 한라봉이면 충분하다고 할 수 있지 않을까?"
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
