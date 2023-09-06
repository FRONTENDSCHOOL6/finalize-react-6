import { Helmet } from 'react-helmet-async';
import right from '@/assets/right.svg';
import logo from '@/assets/card1.png';
import { getPbImageURL } from '@/utils';
import ContentItem from '@/components/content/ContentItem';

export default function Contents() {
  return (
    <div className="flex flex-col justify-center">
      <Helmet>
        <title>나만의 제주 콘텐츠 페이지</title>
      </Helmet>

      <section className="text-center mt-20">
        <h2 className="text-darkblue font-semibold text-4xl">나만의 제주</h2>
        <p className="mt-4">소중한 당신의 추억을 사람들에게 공유해 주세요 :) </p>

        <button className="my-20 inline-flex rounded-full bg-lightsand gap-2 px-6 py-3 border-2 border-blue">
          <p className="text-blue font-extrabold text-lg">추억을 공유하기</p>
          <img src={right} alt="register" />
        </button>
      </section>

      <section className="grid lg:grid-flow-row lg:grid-cols-3 p-1 gap-1 lg:max-h-[900px] mx-[10%] bg-gray-100">
        <ContentItem />
        <ContentItem />
        <ContentItem />
        <ContentItem />
      </section>

      <section className='flex justify-center my-20'>
        <button type="button" className='px-4 text-gray-400 text-xl'>&lt;</button>
        {/* 추후 api 통신하면서 수정 */}
        <div>1 2 3</div>
        <button type="button" className='px-4 text-gray-400 text-xl'>&gt;</button>
      </section>
    </div>
  );
}
