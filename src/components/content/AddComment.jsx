import pb from '@/api/pocketbase';
import debounce from '@/utils/debounce';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';

export default function AddComment({ contentId }) {
  const [text, setText] = useState();
  const [uniqueId, setUniqueId] = useState();
  // const [connect, setConnect] = useState();
  const inputRef = useRef(''); // 댓글 초기화

  const user = localStorage.getItem('user');
  const userObj = JSON.parse(user);
  const userId = userObj.state.user.userId;

  // useEffect(() => {

  // },[connect])

  //# user에서 uniqueId 가져오기
  const findId = async () => {
    // const result = await pb.collection('user').getList(1, 50, {
    //   filter: 'username === userId',
    // });
    // const uniqueId = result.items[0].id;

    // return uniqueId;
    // console.log(runiqueId);
    const resultList = await pb.collection('user').getList(1, 50);
    let uniqueId = '';
    for (let item of resultList.items) {
      uniqueId = item.id;
    }
    return uniqueId;
  };

  // const connectId = async () => {
  //   const data = {
  //     "username": "test_username_update",
  //     "emailVisibility": false,
  //     "password": "87654321",
  //     "passwordConfirm": "87654321",
  //     "oldPassword": "12345678",
  //     "nickname": "test",
  //     "comment": [
  //         "RELATION_RECORD_ID"
  //     ],
  //     "content": [
  //         "RELATION_RECORD_ID"
  //     ]
  // };

  // const record = await pb.collection('user').update('RECORD_ID', data);
  // }

  const handleInput = debounce((e) => {
    setText(e.target.value);
  }, 500);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uniqueId = await findId(); // findId()의 결과값을 직접 uniqueId 변수에 할당

    setUniqueId(uniqueId);

    // formData.append('star', true);
    // formData.append('comment', commentRef.current.value);
    // formData.append('contentId', contentId);
    // formData.append('userId', userId);

    // formData 조회하는 방법
    // for (const [key, value] of formData.entries()) {
    //   console.log('key:', key, 'value:', value);
    // }

    try {
      const data = {
        star: true,
        comment: text,
        contentId: contentId,
        userId: uniqueId,
      };

      if (!userId) {
        alert('로그인 후 이용 가능합니다.');
        return; // 로그인하지 않은 상태에서도 댓글이 서버로 전송되기 때문에 return 필요
      }

      const record = await pb.collection('comment').create(data);
      console.log('성공');
      setText('');
      inputRef.current.value = ''; // 댓글 초기화
      // setConnect();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="grow w-full flex">
        <div className="flex-grow mr-2">
          <label htmlFor="comment" className="sr-only">
            댓글
          </label>
          <input
            type="text"
            id="comment"
            name="comment"
            ref={inputRef} // 댓글 초기화
            defaultValue={text}
            placeholder="별과 함께 이 제주에 대한 마음을 입력해주세요."
            onChange={handleInput}
            required
            className="w-full py-3 px-4 border-2 rounded-md border-lightblue focus:outline-none focus:border-blue"
          />
        </div>
        <button
          type="submit"
          className="min-w-fit px-4 py-3 bg-lightblue hover:bg-blue border-2 text-white font-bold border-lightsand rounded-md"
        >
          ⭐ 마음 등록
        </button>
      </form>
    </>
  );
}

AddComment.propTypes = {
  contentId: PropTypes.string.isRequired,
};
