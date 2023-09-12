import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPbImageURL } from '@/utils';
import PageHead from '@/components/PageHead';
import CommentItem from '@/components/content/CommentItem';
import pb from '@/api/pocketbase';
import ShowMap from '@/components/ShowMap';

export default function ContentDetail() {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [photo, setPhoto] = useState();
  const [tag, setTag] = useState();
  const [comment, setComment] = useState([]);
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    async function getContent() {
      try {
        const jejuContent = await pb
          .collection('content')
          .getOne(
            id,
            { expand: 'commentId,commentId.userId' },
            { requestKey: 'string' }
          );

        const { title, content, tag, expand, location, address } = jejuContent;
        setPhoto(getPbImageURL(jejuContent, 'photo'));
        setContent(content);
        setTag(tag);
        setTitle(title);
        setLocation(location);
        setAddress(address);
        if (expand) setComment(expand.commentId);
      } catch (error) {
        console.error(error);
      }
    }

    getContent();
  }, []);

  return (
    <>
      <PageHead title="Jeju All in One - 나만의 제주" />

      <section className="shadow-content mt-5 mb-20 px-20 py-20 gap-5 flex flex-col items-center mx-[15%] min-h-full rounded-md">
        <h2 className="sr-only">{title}</h2>
        {/* 사진 */}
        <article className="min-w-[400px] ">
          <img src={photo} alt={title} className="w-full h-full object-cover" />
        </article>
        {/* 내용 */}
        <article className="w-full py-2 px-4 rounded-md border border-gray-500">
          <p className="pb-2 font-bold flex justify-between">
            {title}
            <span className="font-light">#{tag}</span>
          </p>
          {content}
        </article>
        <Link to="/content/edit" className="ml-auto">
          <button className="bg-blue text-white py-2 px-4 rounded-lg">
            수정
          </button>
        </Link>
      </section>

      <hr className="hr h-2 border-2" />

      {/* comment */}
      <section className="py-20 flex flex-col justify-center text-center items-center mx-auto min-h-full max-w-[1200px]">
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
        {comment.length !== 0 && (
          <div className="w-full flex flex-col pt-10 px-[15%]">
            {/* <CommentItem /> */}
            {comment?.map((item) => {
              return (
                <CommentItem
                  key={item.id}
                  writer={item.expand.userId.nickname}
                  comment={item.comment}
                />
              );
            })}
          </div>
        )}
      </section>
      <hr />
      <ShowMap address={address} location={location} />
    </>
  );
}
