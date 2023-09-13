import pb from '@/api/pocketbase';
import debounce from '@/utils/debounce';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function AddComment({ contentId }) {
  const [commentInput, setcommentInput] = useState();
  const [uniqueId, setUniqueId] = useState();

  const user = localStorage.getItem('user');
  const userObj = JSON.parse(user);
  const userId = userObj.state.user.userId;

  // const auth = localStorage.getItem('pocketbase_auth');
  // const tokenObj = JSON.parse(auth);
  // const token = tokenObj.token;

  // const commentRef = useRef(null);

  // useEffect(() => {
  //   console.log('commentInput:', commentInput);
  // }, [commentInput]);

  useEffect(() => {
    const fetchUserId = async () => {
      const uniqueId = await findId();
      // userId 값을 상태 변수나 다른 곳에 저장
      setUniqueId(uniqueId);
    };
    fetchUserId();
  }, []);

  const findId = async () => {
    const resultList = await pb.collection('user').getList(1, 50);
    // console.log('resultList:', resultList);
    // console.log(resultList.items);
    let uniqueId = '';
    for (let item of resultList.items) {
      uniqueId = item.id;
      console.log(item.id);
    }
    console.log('uniqueId:', uniqueId);
    return uniqueId;
  };

  const handleInput = debounce((e) => {
    setcommentInput(e.target.value);
  }, 500);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const uniqueId = await pb
    //   .collection('user')
    //   .getFirstListItem(nickname={userId});
    // console.log('uniqueId:', uniqueId);

    // const formData = new FormData();

    // formData.append('star', true);
    // formData.append('comment', commentRef.current.value);
    // formData.append('contentId', contentId);
    // formData.append('userId', userId);

    // formData 조회하는 방법
    // for (const [key, value] of formData.entries()) {
    //   console.log('key:', key, 'value:', value);
    // }

    // const data = {
    //   star: true,
    //   comment: { commentInput },
    //   // comment: 'test',
    //   contentId: contentId,
    //   userId: { userId },
    //   // userId: '0y0a8b6gea00jf1',
    // };

    // console.log('data: ', data);
    // console.log('contentId:', contentId);
    // console.log('userId;', userId);

    try {
      const data = {
        star: true,
        comment: commentInput,
        // comment: 'test',
        contentId: contentId,
        // userId: '0y0a8b6gea00jf1',
        // userId: token,
        userId: uniqueId,
        // userId: userId,
      };

      console.log('data: ', data);
      console.log('contentId:', contentId);
      console.log('userId;', userId);
      // console.log('token:', token);
      console.log('성공');

      if (!userId) {
        alert('로그인 후 이용 가능합니다.');
        return; // 로그인하지 않은 상태에서도 댓글이 서버로 전송되기 때문에 return 필요
      }

      // console.log('formData:', formData);
      // console.log(data);
      const record = await pb.collection('comment').create(data);
      console.log('record: ', record);

      // return record;
    } catch (error) {
      console.error(error);
    }
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
            // ref={commentRef}
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
