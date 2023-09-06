import GetKakaoMap from '@/components/GetKakaoMap';
import { Helmet } from 'react-helmet-async';

export default function TrafficInfo() {
  return (
    <div className="px-8 my-10 flex flex-col justify-center items-center">
      <Helmet>
        <title>Jeju All in One - 제주 교통</title>
      </Helmet>
      <h2 className="text-darkblue font-semibold text-4xl text-center my-10">
        실시간 교통 상황
      </h2>
      <div className="border-2 w-5/6">
        <GetKakaoMap />
      </div>
    </div>
  );
}
