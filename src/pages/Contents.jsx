import { Helmet } from 'react-helmet-async';
import right from '@/assets/right.svg';
import logo from '@/assets/card1.png';

export default function Contents() {
  return (
    <div className="flex flex-col justify-center">
      <Helmet>
        <title>나만의 제주 콘텐츠 페이지</title>
      </Helmet>

      <div className="text-center">
        <h2 className="text-darkblue font-semibold text-4xl">혼자옵서예 !</h2>
        <p className="mt-4">소중한 당신의 경험을 공유해 주세요.</p>

        <button className="my-20 inline-flex rounded-full bg-lightsand gap-2 px-6 py-3 border border-blue">
          <p className="text-blue font-bold text-lg">나만의 제주 등록하기</p>
          <img src={right} alt="register" />
        </button>
      </div>

      <div className="flex flex-wrap border h-[900px] mx-[10%]">
        <div className="sm:basis-full lg:basis-1/3">
          <img className="object-cover" src={logo} alt="" />
        </div>
        <div className="sm:basis-full lg:basis-1/3">
          <img className="object-cover" src={logo} alt="" />
        </div>
        <div className='sm:basis-full lg:basis-1/3'>
          <img className='object-cover' src={logo} alt="" />
        </div>
        <div className='sm:basis-full lg:basis-1/3'>
          <img className='object-cover' src={logo} alt="" />
        </div>
      </div>
    </div>
  );
}
