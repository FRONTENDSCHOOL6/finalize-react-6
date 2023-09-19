import GetKakaoMap from '@/components/KakaoMap/GetKakaoMap';
import PageHead from '@/components/PageHead';

export default function TrafficInfo() {
  return (
    <>
      <PageHead title="Jeju All in One - 제주 교통" />

      <div className="py-2 mt-5 flex flex-col justify-center items-center">
        <h2 className="text-blue font-semibold text-4xl text-center mb-10">
          실시간 교통 상황
        </h2>
        <GetKakaoMap />
      </div>
    </>
  );
}
