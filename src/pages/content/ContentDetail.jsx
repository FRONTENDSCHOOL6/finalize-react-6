import PageHead from '@/components/PageHead';
import CommentItem from '@/components/content/CommentItem';
import ContentTitle from '@/components/content/ContentTitle';

export default function ContentDetail() {
  return (
    <>
      <PageHead title="Jeju All in One - 나만의 제주" />
      
      <ContentTitle title="박지영님의 추억" />
      <section className="shadow-content my-20 px-32 py-20 gap-10 flex flex-col justify-center text-center items-center mx-[15%] min-h-full rounded-md">
        <h2 className="sr-only">콘텐츠 상세 페이지</h2>

        {/* 사진 */}
        <div className="min-w-[400px] ">
          <img
            src="./jejuImage2.jpg"
            alt="alt 변수"
            className="w-full h-full object-cover"
          />
        </div>
        {/* 위치 */}
        <div className="w-full py-2 px-4 rounded-md border border-lightsand">
          위치 들어갈 위치
        </div>
        {/* 태그 */}
        <div className="w-full py-2 px-4 rounded-md border border-lightsand">
          태그 들어갈 위치
        </div>
        {/* 내용 */}
        <div className="w-full py-2 px-4 rounded-md border border-lightsand">
          내용 들어갈 위치
        </div>
      </section>

      <hr className="hr h-2 border-2 my-10" />

      {/* comment */}
      <section className="my-10 py-20 flex flex-col justify-center text-center items-center mx-auto min-h-full max-w-[1200px]">
        {/* 댓글 등록 */}
        <div className="w-full flex flex-row gap-4 justify-between items-center px-[15%]">
          <div className="grow w-full">
            <label htmlFor="comment" className="sr-only">
              댓글
            </label>
            <input
              type="text"
              id="comment"
              name="comment"
              placeholder="별과 함께 이 제주에 대한 마음을 입력해주세요."
              className="w-full py-3 px-4 border-2 rounded-md border-lightblue focus:outline-none focus:border-blue"
            />
          </div>
          <button
            type="button"
            className="min-w-fit px-4 py-3 bg-lightblue hover:bg-blue border-2 text-white font-bold border-lightsand rounded-md"
          >
            ⭐ 마음 등록
          </button>
        </div>

        {/* 댓글 달리는 영역 */}
        <div className="w-full flex flex-col py-10 px-[15%]">
          <CommentItem />
        </div>
      </section>
    </>
  );
}
