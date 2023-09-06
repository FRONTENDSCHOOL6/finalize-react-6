import more from '@/assets/more.svg';

export default function CommentItem() {
  return (
    <>
      <div className="shadow-comment w-full h-fit flex justify-between gap-4 py-3 px-4">
        <div className="text-darkblue font-semibold">작성자</div>
        <p className="grow text-start">댓글입니다.</p>
        <button className="">
          <img src={more} alt="more" />
        </button>
      </div>
    </>
  );
}
