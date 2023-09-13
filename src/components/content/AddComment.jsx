import pb from '@/api/pocketbase';
import debounce from '@/utils/debounce';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function AddComment({ contentId }) {
  const [commentInput, setcommentInput] = useState();

  const user = localStorage.getItem('user');
  const userObj = JSON.parse(user);
  const userId = userObj.state.user.userId;

  const commentRef = useRef(null);

  useEffect(() => {
    console.log('commentInput:', commentInput);
  }, [commentInput]);

  const handleInput = debounce((e) => {
    setcommentInput(e.target.value);
  }, 500);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('star', true);
    formData.append('comment', commentRef.current.value);
    formData.append('contentId', contentId);
    formData.append('userId', userId);

    console.log('formData:', formData);

    // formData 조회하는 방법
    for (const [key, value] of formData.entries()) {
      console.log('key:', key, 'value:', value);
    }

    const data = {
      star: true,
      // comment: commentInput,
      comment: 'test',
      contentId: contentId,
      // userId: userId,
      userId: '0y0a8b6gea00jf1',
    };

    console.log('data: ', data);
    console.log('contentId:', contentId);
    console.log('userId;', userId);

    try {
      if (!userId) {
        alert('로그인 후 이용 가능합니다.');
        return; // 로그인하지 않은 상태에서도 댓글이 서버로 전송되기 때문에 return 필요
      }

      // console.log('formData:', formData);
      // console.log(data);
      const record = await pb.collection('comment').create(data);
      console.log(record);

      // return record;
    } catch (error) {
      console.error(error);
    }

    // const auth = localStorage.getItem('pocketbase_auth');
    // const tokenObj = JSON.parse(auth);
    // const token = tokenObj.token;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grow w-full">
          <label htmlFor="comment" className="sr-only">
            댓글
          </label>
          <input
            type="text"
            id="comment"
            name="comment"
            ref={commentRef}
            defaultValue={commentInput}
            placeholder="별과 함께 이 제주에 대한 마음을 입력해주세요."
            onChange={handleInput}
            className="w-full py-3 px-4 border-2 rounded-md border-lightblue focus:outline-none focus:border-blue"
          />
        </div>
        <button
          type="submit"
          // onClick={handleSubmit}
          className="min-w-fit px-4 py-3 bg-lightblue hover:bg-blue border-2 text-white font-bold border-lightsand rounded-md"
        >
          ⭐ 마음 등록
        </button>
      </form>
    </>
  );
}
