import right from '@/assets/right.svg';
import ContentItem from '@/components/content/ContentItem';
import ContentTitle from '@/components/content/ContentTitle';
import PageHead from '@/components/PageHead';

export default function Contents() {
  return (
    <>
    <PageHead title="Jeju All in One - 나만의 제주" />

    <div className="flex flex-col justify-center items-center">
      <section className="text-center mt-20">
        <ContentTitle title="나만의 제주" />
        <p className="mt-4">소중한 당신의 추억을 사람들에게 공유해 주세요 :) </p>

        <button className="my-20 inline-flex rounded-full items-center bg-lightsand gap-2 px-6 py-3 border-2 border-blue">
          <p className="text-blue font-extrabold text-lg">추억을 공유하기</p>
          <img src={right} alt="register" />
        </button>
      </section>

      <section className="contentContainer p-1 mx-auto bg-gray-100">
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
    </>
  );
}
