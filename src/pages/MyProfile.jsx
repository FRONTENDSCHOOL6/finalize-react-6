import pb from '@/api/pocketbase';
import PageHead from '@/components/PageHead';
import ProfileCommentSection from '@/components/profile/ProfileCommentSection';
import ProfileContentSection from '@/components/profile/ProfileContentSection';
import { useAuthStore } from '@/store/useAuthStore';
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

export default function MyProfile() {
  const { user } = useAuthStore();
  const nicknameRef = useRef(null);
  const [nickname, setNickname] = useState('');
  const [nicknameEdit, setNicknameEdit] = useState(false);
  const [showAllContent, setShowAllContent] = useState(false);
  const [showAllComment, setShowAllComment] = useState(false);

  useEffect(() => {
    async function getContent() {
      try {
        const jejuContent = await pb.collection('user').getOne(user.id);
        const { nickname } = jejuContent;
        setNickname(nickname);
      } catch (error) {
        console.error(error);
      }
    }
    getContent();
  }, [user.id]);

  const handleEditmode = () => {
    setNicknameEdit(true);
  };

  const handleNickname = () => {
    try {
      if (nickname === nicknameRef?.current?.value) {
        toast.error('닉네임을 수정해주세요.');
        return;
      } else {
        pb.collection('user').update(user.id, {
          nickname: nicknameRef.current.value,
        });
        setNickname(nicknameRef.current.value);
        toast.success('닉네임이 수정되었습니다.');
        setNicknameEdit(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHead title="Jeju All in One - 내 프로필" />

      <section className="flex justify-center gap-4 pt-10 font-bold text-lg text-center">
        <article>
          {!nicknameEdit && (
            <p>
              {nickname}
              <button onClick={handleEditmode}>
                <img
                  src={`${import.meta.env.VITE_DOMAIN}/pen_edit.svg`}
                  alt="닉네임 수정"
                  className="w-6"
                />
              </button>
              님 환영합니다.
            </p>
          )}
          {nicknameEdit && (
            <div>
              <input
                type="text"
                ref={nicknameRef}
                defaultValue={nickname}
                maxLength={10}
                className="w-44 border-2 border-slate-500 rounded pl-2 mr-2"
              />
              <button onClick={handleNickname} className="mr-2">
                수정
              </button>
              <button onClick={() => setNicknameEdit(false)}>취소</button>
            </div>
          )}
        </article>
      </section>

      <ProfileContentSection
        showMore={showAllContent}
        setShowMore={setShowAllContent}
      />

      <ProfileCommentSection
        showMore={showAllComment}
        setShowMore={setShowAllComment}
      />
    </>
  );
}
