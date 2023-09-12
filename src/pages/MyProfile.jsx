import MainContent from '@/components/MainContent';
import ProfileComment from '@/components/ProfileComment';
import TitleButton from '@/components/TitleButton';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function MyProfile() {
  return (
    <>
      <Helmet>
        <title>Jeju All in One - 내 프로필</title>
      </Helmet>

      <section className="mx-10">
        <TitleButton title="나의 제주" link="#" />
        <hr />
        <ul className="flex grow gap-5 my-10 w-11/12 mx-auto">
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
      </section>

      <section className="mx-10 mb-12">
        <TitleButton title="나의 제주의 별" link="#" />
        <hr />
        <ul className="w-11/12 mx-auto my-10">
          <Link to="/content">
            <ProfileComment
              src="/jejuImage1.jpg"
              alt="메밀꽃밭"
              date="2023-09-06"
              comment="메밀꽃밭을 보는 순간, 그에 사로잡힌 나는, 그 밭에 누워 삼박사일을 보내고만 싶었다."
            />
          </Link>
          <Link to="/content">
            <ProfileComment
              src="/jejuImage2.jpg"
              alt="오름"
              date="2023-09-06"
              comment="오름의 정상을 보자마자, 정상과 구름의 조화로운 신비에 사로잡혀 무엇에 홀린 듯 정신없이 올라갔다."
            />
          </Link>
        </ul>
      </section>
    </>
  );
}
