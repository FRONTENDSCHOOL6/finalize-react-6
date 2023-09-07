import PageHead from '@/components/PageHead';
import CommentItem from '@/components/content/CommentItem';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import pb from '@/api/pocketbase';
import { useRef } from 'react';
import { useState } from 'react';
import { getPbImageURL } from '@/utils';

export default function ContentDetail() {
  const { id } = useParams();
  const contentRef = useRef(null);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [photo, setPhoto] = useState();
  const [tag, setTag] = useState();

  useEffect(() => {
    async function getProduct() {
      try {
        const product = await pb.collection('content').getOne(id);
        const { title, content, tag, commentId } = product;
        setPhoto(getPbImageURL(product, 'photo'));
        setContent(content);
        setTag(tag);
        setTitle(title);
      } catch (error) {
        console.error(error);
      }
    }

    getProduct();
  }, [id, setContent]);

  return (
    <>
      <PageHead title="Jeju All in One - 나만의 제주" />

      {/* <ContentTitle title="박지영님의 추억" /> */}
      <section className="shadow-content mt-5 mb-20 px-32 py-20 gap-5 flex flex-col items-center mx-[15%] min-h-full rounded-md">
        {/* <h2 className="text-xl font-bold text-darkblue">{title}</h2> */}

        {/* 사진 */}
        <article className="min-w-[400px] ">
          <img src={photo} alt={title} className="w-full h-full object-cover" />
        </article>
        <div className="flex gap-5 w-4/5">
          {/* 위치 */}
          <article className="w-full py-2 px-4 rounded-md border text-center border-gray-500">
            위치
          </article>
          {/* 태그 */}
          <article className="w-full py-2 px-4 rounded-md border text-center border-gray-500">
            {tag}
          </article>
        </div>
        {/* 내용 */}
        {/* <article>{title}</article> */}
        <article
          ref={contentRef}
          className="w-full py-2 px-4 rounded-md border border-gray-500"
        >
          <p className="pb-2 font-bold">{title}</p>
          {content}
        </article>
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
