import more from '@/assets/more.svg';

export default function CommentItem({
  writer = '작성자',
  comment = '댓글입니다',
}) {
  return (
    <>
      <div className="shadow-comment w-full h-fit flex justify-between gap-4 py-3 px-4">
        <span>⭐</span>
        <div className="text-darkblue font-semibold">{writer}</div>
        <p className="grow text-start">{comment}</p>
        <button className="">
          <img src={more} alt="more" />
        </button>
      </div>
    </>
  );
}
