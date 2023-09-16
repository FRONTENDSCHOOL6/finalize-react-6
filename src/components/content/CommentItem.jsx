import pb from '@/api/pocketbase';
import more from '@/assets/more.svg';
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CommentItem({
  writer = '작성자',
  comment = '댓글입니다',
  commentId,
  onCommentInfoChange,
}) {
  // console.log('commentId:', commentId);

  const [userName] = useState(() => {
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    const userName = userObj.state.user.username; // 소희
    return userName;
  });

  const [nickName, setNickName] = useState(null);

  useEffect(() => {
    const findNickname = async () => {
      const result = await pb.collection('user').getList(1, 1, {
        expand: 'comment, content',
        filter: `(nickname = '${userName}')`,
      });

      const resultNickName = result.items[0].nickname; // 소희
      setNickName(resultNickName);
    };
    findNickname();
  }, [userName]);

  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = () => {
    setShowOptions(!showOptions);
  };

  const handleEdit = () => {
    console.log('수정');
    // setShowOptions(false); // Close the dropdown after action
  };

  const handleDelete = (commentId) => {
    // setShowOptions(false); // Close the dropdown after action

    if (userName !== nickName) {
      import.meta.env.MODE === 'development' && toast.dismiss();

      toast('작성자만 삭제 가능합니다.', {
        position: 'top-right',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      return;
    }

    const deleteComment = async () => {
      console.log('삭제', commentId);
      await pb.collection('comment').delete(commentId);
    };

    deleteComment();
  };

  const fineUserName = async () => {
    const record = await pb.collection('comment').getOne('RECORD_ID', {
      expand: 'users',
    });
  };

  return (
    <>
      <div className="shadow-comment w-full h-fit flex justify-between gap-4 py-3 px-4 bg-yellow-200">
        <span className="bg-gray-200">⭐</span>
        <div className="text-darkblue font-semibold bg-orange-300">
          {writer}
        </div>
        <p className="grow text-start bg-pink-200">{comment}</p>
        <button onClick={handleSelect} className="bg-sky-300 shrink-0 ">
          <img src={more} alt="more" />
          {/* 
          {showOptions &&
            totalCommentInfo.commentId.map((id) => (
              <ul key={id} className="dropdown-menu">
                <li onClick={() => handleEdit(id)}>수정</li>
                <li onClick={() => handleDelete(id)}>삭제</li>
              </ul>
            ))} */}
          {showOptions && (
            <ul key={commentId} className="dropdown-menu">
              <li onClick={() => handleEdit(commentId)}>수정</li>
              <li onClick={() => handleDelete(commentId)}>삭제</li>
            </ul>
          )}
        </button>
      </div>
    </>
  );
}
