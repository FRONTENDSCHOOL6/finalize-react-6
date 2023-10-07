import pb from '@/api/pocketbase';
import more from '@/assets/more.svg';
import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CommentItem({
  writer = '작성자',
  comment = '댓글입니다',
  commentId,
  onCommentChange,
  commentTime,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);
  const [originalComment] = useState(comment);

  const [userName] = useState(() => {
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    const userName = userObj.state.user.username;
    return userName;
  });

  const handleSelect = () => {
    setShowOptions(!showOptions);
    setIsEditMode(!isEditMode);
  };

  const handleSave = async (commentId) => {
    const updateData = {
      comment: editedComment,
    };

    try {
      //# 댓글 수정
      await pb.collection('comment').update(commentId, updateData);
    } catch (error) {
      throw new Error(error.message);
    }
    setShowOptions(false);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // 수정 취소 시 원래 댓글 내용으로 복원
    setEditedComment(originalComment);
  };

  const handleDelete = async (commentId) => {
    setShowOptions(false);

    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="w-full flex flex-col p-5 text-center gap-10">
            <p className="font-semibold text-lg mt-4">
              댓글을 삭제하시겠습니까 ?
            </p>
            <div className="flex justify-center items-center gap-5">
              <button
                onClick={async () => {
                  try {
                    //# 댓글 삭제
                    await pb.collection('comment').delete(commentId);
                    toast.remove(t.id);
                    onCommentChange((prevComments) =>
                      prevComments.filter((item) => item.id !== commentId)
                    );
                  } catch (error) {
                    console.error(error);
                  }
                }}
                className="bg-lightblue focus:bg-blue text-center text-white rounded-lg px-4 py-3 leading-none"
              >
                삭제
              </button>
              <button
                onClick={() => toast.remove(t.id)}
                className="bg-lightblue focus:bg-blue text-center text-white rounded-lg px-4 py-3 leading-none"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  };

  const Time = commentTime.slice(0, 10);

  return (
    <>
      <div className="shadow-comment w-full h-fit flex flex-row justify-between gap-2 py-3 px-4  s:flex s:flex-col">
        <div className="flex flex-row gap-2">
          <span>⭐</span>
          <div className="text-darkblue font-semibold shrink-0 w-[80px] text-left s:w-auto dark:text-slate-200">
            {writer}
          </div>
        </div>
        {isEditMode ? (
          <textarea
            type="text"
            value={editedComment}
            className="grow text-start bg-lightsand dark:bg-slate-800 dark:border-black dark:border-2 dark:p-2"
            onChange={(e) => setEditedComment(e.target.value)}
            maxLength="300"
          /> // 수정 누르면 isEditMode가 false(기본값)에서 true로 바뀜
        ) : (
          <p className="grow text-justify">{editedComment}</p>
          // 저장 누르면 isEditMode(false)
        )}
        <div className="flex flex-row justify-between">
          <div onClick={handleSelect} className="cursor-pointer">
            {!showOptions && userName === writer && (
              <img src={more} alt="more" className="min-w-[24px]" />
            )}
            {showOptions && (
              <ul className="dropdown-menu flex gap-2">
                <li>
                  <button onClick={() => handleSave(commentId)}>수정</button>
                </li>
                <li>
                  <button onClick={() => handleDelete(commentId)}>삭제</button>
                </li>
                <li>
                  <button onClick={() => handleCancel(commentId)}>취소</button>
                </li>
              </ul>
            )}
          </div>
          <div className="min-w-[100px] text-right">{Time}</div>
        </div>
      </div>
    </>
  );
}

CommentItem.propTypes = {
  writer: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  commentTime: PropTypes.string.isRequired,
};
