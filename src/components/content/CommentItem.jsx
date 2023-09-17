import pb from '@/api/pocketbase';
import more from '@/assets/more.svg';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

export default function CommentItem({
  writer = '작성자',
  comment = '댓글입니다',
  commentId,
  onCommentChange,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);
  const [originalComment, setOriginalComment] = useState(comment);

  const [userName] = useState(() => {
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    const userName = userObj.state.user.username;
    return userName;
  });

  const handleSelect = () => {
    setShowOptions(!showOptions);
  };

  const handleEdit = () => {
    if (userName !== writer) {
      import.meta.env.MODE === 'development' && toast.dismiss();

      toast('작성자만 수정 가능합니다.', {
        position: 'top-right',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      return;
    }

    setShowOptions(false); // Close the dropdown after action
    setIsEditMode(true);
  };

  const handleSave = async (commentId) => {
    const updateData = {
      comment: editedComment,
    };

    try {
      await pb.collection('comment').update(commentId, updateData);
    } catch (error) {
      throw new Error(error.message);
    }
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // 수정 취소 시 원래 댓글 내용으로 복원
    setEditedComment(originalComment);
  };

  const handleDelete = async (commentId) => {
    setShowOptions(false); // Close the dropdown after action

    if (userName !== writer) {
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

  return (
    <>
      <div className="shadow-comment w-full h-fit flex justify-between gap-4 py-3 px-4">
        <span>⭐</span>
        <div className="text-darkblue font-semibold  ">{writer}</div>
        {isEditMode ? (
          <input
            type="text"
            value={editedComment}
            className="grow text-start bg-lightsand"
            onChange={(e) => setEditedComment(e.target.value)}
          /> // 수정 누르면 isEditMode가 false(기본값)에서 true로 바뀜
        ) : (
          <p className="grow text-start">{editedComment}</p> // 저장 누르면 isEditMode(false)
        )}
        <button onClick={handleSelect} className="shrink-0">
          <img src={more} alt="more" />
          {showOptions && (
            <ul key={commentId} className="dropdown-menu">
              {isEditMode ? (
                <>
                  <li onClick={() => handleSave(commentId)}>저장</li>
                  <li onClick={() => handleCancel(commentId)}>취소</li>
                </>
              ) : (
                <>
                  <li onClick={() => handleEdit(commentId)}>수정</li>
                  <li onClick={() => handleDelete(commentId)}>삭제</li>
                </>
              )}
            </ul>
          )}
        </button>
      </div>
    </>
  );
}

CommentItem.propTypes = {
  writer: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  onCommentChange: PropTypes.func.isRequired,
};
