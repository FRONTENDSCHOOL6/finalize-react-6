import pb from '@/api/pocketbase';
import debounce from '@/utils/debounce';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import toast from 'react-hot-toast';

export default function AddComment({ contentId, onCommentInfoChange }) {
  const [text, setText] = useState('');
  const [commentUserId, setcommentUserId] = useState(); // 댓글 쓴 user id
  const [connect, setConnect] = useState(); // 댓글 입력 후
  const inputRef = useRef(''); // 댓글 초기화

  //# localStorage에서 가져오기
  const user = localStorage.getItem('user');
  const userObj = JSON.parse(user);
  const userId = userObj.state.user.userId; // sohee

  //# user에서 uniqueId 가져오기
  const findId = async () => {
    const result = await pb.collection('user').getList(1, 50, {
      expand: 'comment, content',
      filter: `(username = '${userId}')`,
    });

    // console.log('result: ', result);

    const uniqueId = result.items[0].id; // 0y0a8b6gea00jf1
    const userName = result.items[0].username; // sohee
    const emailVisiblility = false;
    const nickName = result.items[0].nickname; // 소희

    return uniqueId;
  };

  //# 입력 칸
  const handleInput = debounce((e) => {
    setText(e.target.value);
  }, 500);

  //# 전송 버튼
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 공백이 전송되지않도록
    if (!text.trim()) {
      import.meta.env.MODE === 'development' && toast.dismiss();

      toast('댓글을 입력해주세요.', {
        position: 'top-right',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      return;
    }

    if (!userId) {
      import.meta.env.MODE === 'development' && toast.dismiss();

      toast('로그인 후 이용 가능합니다.', {
        position: 'top-right',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      return; // 로그인하지 않은 상태에서도 댓글이 서버로 전송되기 때문에 return 필요
    }

    const uniqueId = await findId(); // findId()의 결과값을 직접 uniqueId 변수에 할당
    setcommentUserId(uniqueId);

    try {
      const data = {
        star: true,
        comment: text,
        contentId: contentId,
        userId: uniqueId,
      };

      const record = await pb.collection('comment').create(data, {
        expand: ['userId, contentId'],
      });
      console.log('성공');
      setText('');
      inputRef.current.value = ''; // 댓글 초기화
      // console.log('data:', data);
      // setConnect(data);
      setConnect(record);
      onCommentInfoChange(record);
      console.log('record:', record);
      // console.log('record.id:', record.id); // 댓글 생성 후 만들어지는 id
      // contentUpdate({ record });
      userUpdate(record);
    } catch (error) {
      console.error(error);
    }
  };

  //# user에 업데이트
  const userUpdate = async (record) => {
    console.log('contentUpdatd record:', record);
    return await pb.collection('user').update(commentUserId, {
      'comment+': record.id,
    });
  };

  //# content에 업데이트
  const contentUpdate = async ({ record }) => {
    console.log('contentUpdatd record:', record);
    // return await pb.collection('content').update(contentId, {
    //   'commentId+': record.id,
    // });
  };

  //# 댓글 등록 후 업데이트
  useEffect(() => {
    console.log('connect:', connect);
    // userUpdate(record);
    // contentUpdate(record);
  }, [connect]);

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
  onCommentInfoChange: PropTypes.func.isRequired,
};

// 파일 업로드 시에 formData 사용
// formData.append('star', true);
// formData.append('comment', commentRef.current.value);
// formData.append('contentId', contentId);
// formData.append('userId', userId);

// formData 조회하는 방법
// for (const [key, value] of formData.entries()) {
//   console.log('key:', key, 'value:', value);
// }
