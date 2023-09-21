import pb from '@/api/pocketbase';
import debounce from '@/utils/debounce';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function AddComment({ contentId, onCommentInfoChange }) {
  const [text, setText] = useState('');
  const [commentUserId, setCommentUserId] = useState('');
  const inputRef = useRef(''); // 댓글 초기화

  //@ 컴포넌트가 렌더링 될 때마다 로컬스토리지 값을 읽지 않도록 userId 상태로 관리하세요.
  const [userId] = useState(() => {
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    const userId = userObj.state.user.userId;
    return userId;
  });

  const findId = async () => {
    const result = await pb.collection('user').getList(1, 1, {
      expand: 'comment, content',
      filter: `(username = '${userId}')`,
    });

    const uniqueId = result.items[0].id;
    return uniqueId;
  };

  const handleInput = debounce((e) => {
    setText(e.target.value);
  }, 500);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      return;
    }

    if (!inputRef.current.value.trim()) {
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

    const uniqueId = await findId();

    //@ ※ commentUserId 상태는 스냅샷으로 즉시 값이 변경되지 않습니다.
    //@   그러므로 값이 변경된 이후 서버에 요청해야 합니다. (아래 useEffect 참고)
    setCommentUserId(uniqueId);
  };

  useEffect(() => {
    // 댓글 작성자가 존재할 경우에만 처리
    if (commentUserId) {
      //# user.comment에 레코드 ID 추가
      const userUpdate = async (record) => {
        return await pb.collection('user').update(commentUserId, {
          'comment+': record.id,
        });
      };

      //# content.commendId에 레코드 ID 추가
      const contentUpdate = async (record) => {
        return await pb.collection('content').update(contentId, {
          'commentId+': record.id,
        });
      };

      //# 마음 등록 전송 후 처리할 사항
      const afterSubmit = async () => {
        const data = {
          star: true,
          comment: text,
          contentId: contentId,
          userId: commentUserId,
        };

        if (inputRef.current.value.trim()) {
          const record = await pb.collection('comment').create(data, {
            expand: 'userId',
          });

          setText('');
          inputRef.current.value = '';

          await contentUpdate(record);
          await userUpdate(record);

          onCommentInfoChange?.(record);
        }
      };

      try {
        afterSubmit();
      } catch (error) {
        console.error(error);
      }
    }
  }, [commentUserId, contentId, onCommentInfoChange]);

  return (
    <>
      <form onSubmit={handleSubmit} className="grow w-full flex">
        <div className="flex-grow mr-2">
          <label htmlFor="comment" className="sr-only">
            댓글
          </label>
          <textarea
            id="text"
            name="comment"
            ref={inputRef} // 댓글 초기화
            defaultValue={text}
            placeholder={
              !userId
                ? '로그인 후 이용 가능합니다'
                : '별과 함께 이 제주에 대한 마음을 입력해주세요.'
            }
            onChange={handleInput}
            required
            disabled={!userId ? true : false}
            maxLength="300"
            className="w-full py-3 px-4 border-2 rounded-md border-lightblue focus:outline-none focus:border-blue disabled:bg-gray-200 disabled:placeholder:text-gray-800"
          ></textarea>
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
