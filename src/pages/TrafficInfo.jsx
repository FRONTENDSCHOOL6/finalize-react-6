import GetKakaoMap from '@/components/GetKakaoMap';
import PageHead from '@/components/PageHead';

export default function TrafficInfo() {
  return (
    <>
      <PageHead title="Jeju All in One - 제주 교통" />

      <div className="px-8 my-10 flex flex-col justify-center items-center">
        <h2 className="text-darkblue font-semibold text-4xl my-10">
          실시간 교통 상황
        </h2>
        <GetKakaoMap />
      </div>
    </>
  );
}