import pb from '@/api/pocketbase';
import PageHead from '@/components/PageHead';
import ProfileCommentSection from '@/components/profile/ProfileCommentSection';
import ProfileContentSection from '@/components/profile/ProfileContentSection';
import { useAuthStore } from '@/store/useAuthStore';
import { useState, useEffect } from 'react';

export default function MyProfile() {
  const { user } = useAuthStore();
  const [nickname, setNickname] = useState('');
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

  return (
    <>
      <PageHead title="Jeju All in One - 내 프로필" />

      <section className="pt-10 font-bold text-lg text-center">
        {nickname} 님 환영합니다.
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
