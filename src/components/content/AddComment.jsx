import pb from '@/api/pocketbase';
import debounce from '@/utils/debounce';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import toast from 'react-hot-toast';

export default function AddComment({ contentId, onCommentInfoChange }) {
  const [text, setText] = useState();
  const [uniqueId, setUniqueId] = useState(); // users id
  const [connect, setConnect] = useState(); // 댓글 입력 후
  const inputRef = useRef(''); // 댓글 초기화
  // const [result, setResult] = useState();

  //# localStorage에서 가져오기
  const user = localStorage.getItem('user');
  const userObj = JSON.parse(user);
  const userId = userObj.state.user.userId; // sohee

  //# 댓글 등록 후 업데이트 contentId, id 확인
  useEffect(() => {
    console.log('connect:', connect);

    //# user 업데이트
    // const connectComment = async () => {
    // const updateData = {
    //   // username: 'test_username_update',
    //   // emailVisibility: false,
    //   // password: '87654321',
    //   // passwordConfirm: '87654321',
    //   // oldPassword: '12345678',
    //   // nickname: 'test',
    //   // comment: ['RELATION_RECORD_ID'],
    //   ...result,
    //   content: [connect.id],
    // };
    // console.log('updateData:', updateData);
    // const userInfo = await pb.collection('user').update(uniqueId, updateData);
    // console.log('userInfo:', userInfo);
    // };

    // console.log('connect.id:', connect.id);
    // commentId(connect.id);
    // console.log('connect.id:', connect.id); // 댓글 id

    // const getOne = async () => {
    //   const getOneId = await pb
    //     .collection('comment')
    //     // .getFirstListItem(`'id=${connect.id}'`);
    //     .getFirstListItem();
    //   console.log('getOneId:', getOneId);
    // };

    // getOne();

    // if (connect) {
    //   const update = async () => {
    //     const post = await pb.collection('comment').update(connect.id, {
    //       // users: connect.id,
    //       // users: uniqueIdco,
    //     });
    //     console.log(connect.id);
    //   };
    //   update();
    // }
  }, [connect]);

  //# user에서 uniqueId 가져오기
  const findId = async () => {
    const result = await pb.collection('user').getList(1, 50, {
      expand: 'comment, content',
      // filter: `(username = '${userId}')`,
    });

    // setResult(result);
    // console.log('result: ', result);

    const uniqueId = result.items[0].id; // 0y0a8b6gea00jf1
    const userName = result.items[0].username; // sohee
    const emailVisiblility = false;
    const nickName = result.items[0].nickname; // 소희

    // console.log('username:', userName);
    // console.log('emailVisiblility:', emailVisiblility);
    // console.log('nicname:', nickName);

    //% comment가 존재하는지 확인
    let connectComment;
    if (result.items[0].comment) {
      connectComment = result.items[0].comment[0];
    }
    // console.log('connectComment:', connectComment);

    //% content가 존재하는지 확인
    let connectContent;
    if (result.items[0].content) {
      connectContent = result.items[0].content[0];
    }
    // console.log('connectContent:', connectContent);

    return uniqueId;
  };

  //# 입력 칸
  const handleInput = debounce((e) => {
    setText(e.target.value);
  }, 500);

  //# 전송 버튼
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 엔터 쳤을 때 공백 전송되지않도록
    if (!text.trim()) {
      import.meta.env.MODE === 'development' && toast.dismiss();

      toast('댓글을 입력해주세요.', {
        position: 'top-center',
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
        position: 'top-center',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      return; // 로그인하지 않은 상태에서도 댓글이 서버로 전송되기 때문에 return 필요
    }

    const uniqueId = await findId(); // findId()의 결과값을 직접 uniqueId 변수에 할당

    setUniqueId(uniqueId);

    try {
      const data = {
        star: true,
        comment: text,
        contentId: contentId,
        userId: uniqueId,
      };

      const record = await pb.collection('comment').create(data, {
        // expand: 'content, user',
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

// 파일 업로드 시에 formData 사용
// formData.append('star', true);
// formData.append('comment', commentRef.current.value);
// formData.append('contentId', contentId);
// formData.append('userId', userId);

// formData 조회하는 방법
// for (const [key, value] of formData.entries()) {
//   console.log('key:', key, 'value:', value);
// }
