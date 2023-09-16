import pb from '@/api/pocketbase';
import more from '@/assets/more.svg';
import { useEffect } from 'react';
import { useState } from 'react';
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

  const [userName] = useState(() => {
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    const userName = userObj.state.user.username; // 소희
    return userName;
  });

  const handleSelect = () => {
    setShowOptions(!showOptions);
  };

  const handleEdit = (commentId) => {
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
    setIsEditMode(!isEditMode);
  };

  const handleSaveClick = async (commentId) => {
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

    try {
      await pb.collection('comment').delete(commentId);

      // 댓글 삭제 후 comment 배열에서도 제거
      onCommentChange((prevComments) =>
        prevComments.filter((item) => item.id !== commentId)
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <div className="shadow-comment w-full h-fit flex justify-between gap-4 py-3 px-4 bg-yellow-200">
        <span className="bg-gray-200">⭐</span>
        <div className="text-darkblue font-semibold bg-orange-300">
          {writer}
        </div>
        {isEditMode ? (
          <input
            type="text"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
        ) : (
          <p className="grow text-start bg-pink-200">{editedComment}</p>
        )}
        <button onClick={handleSelect} className="bg-sky-300 shrink-0 ">
          <img src={more} alt="more" />
          {showOptions && (
            <ul key={commentId} className="dropdown-menu">
              <li onClick={() => handleEdit(commentId)}>수정</li>
              {isEditMode && (
                <li onClick={() => handleSaveClick(commentId)}>저장</li>
              )}

              <li onClick={() => handleDelete(commentId)}>삭제</li>
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
