import pb from '@/api/pocketbase';
import PageHead from '@/components/PageHead';
import ProfileComment from '@/components/ProfileComment';
import ScrollToTop from '@/components/ScrollToTop';
import Spinner from '@/components/Spinner';
import TitleButton from '@/components/TitleButton';
import ContentItem from '@/components/content/ContentItem';
import { useAuthStore } from '@/store/useAuthStore';
import { getPbImageURL } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

async function fetchContents(options) {
  let queryParams = '';
  queryParams = `?sort=${options.sort}&filter=${options.filter}&page=${options.page}&perPage=${options.perPage}`;
  const response = await fetch(
    `${import.meta.env.VITE_PB_API}/collections/${
      options.collection
    }/records${queryParams}`
  );
  return await response.json();
}

export default function MyProfile() {
  const { user } = useAuthStore();
  const [nickname, setNickname] = useState('');
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [showAllContent, setShowAllContent] = useState(false);
  const [showAllComment, setShowAllComment] = useState(false);
  const [collection, setCollection] = useState('content');

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);

  const [sort, setSort] = useState('-created');

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['contents', sort, user, page, perPage, collection],
    queryFn: () =>
      fetchContents({
        sort,
        filter: `userId='${user.id}'`,
        page,
        perPage,
        collection,
      }),
    keepPreviousData: true,
  });

  useEffect(() => {
    async function getContent() {
      try {
        const jejuContent = await pb
          .collection('user')
          .getOne(
            user.id,
            { expand: 'comment,comment.contentId,content' },
            { requestKey: 'string' }
          );

        const { nickname, expand } = jejuContent;
        setNickname(nickname);

        if (expand && expand.comment) {
          setComment(expand.comment);
        }
        if (expand && expand.content) {
          setPost(expand.content);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getContent();
  }, [user.id]);

  const handleShowAll = (category) => () => {
    if (category === 'content') setShowAllContent(!showAllContent);
    if (category === 'comment') setShowAllComment(!showAllComment);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <ScrollToTop />
      <PageHead title="Jeju All in One - 내 프로필" />

      <section className="pt-10 font-bold text-lg text-center">
        {nickname} 님 환영합니다.
      </section>

      <section className="mx-10 pt-10">
        <TitleButton
          title="나의 제주"
          link="#"
          count={post.length}
          section="게시글"
          onClick={handleShowAll('content')}
          showMore={showAllContent}
        />
        <hr />
        <ul className="my-10 w-11/12 mx-auto contentContainer">
          {data?.items?.length === 0 && <ContentItem />}
          {!showAllContent &&
            data?.items?.slice(0, 3).map((item) => {
              return (
                <ContentItem
                  key={item.id}
                  content={item.id}
                  title={item.title}
                  count={item.commentId.length}
                  src={getPbImageURL(item, 'photo')}
                />
              );
            })}
          {showAllContent &&
            data?.items?.map((item) => {
              return (
                <ContentItem
                  key={item.id}
                  content={item.id}
                  title={item.title}
                  count={item.commentId.length}
                  src={getPbImageURL(item, 'photo')}
                />
              );
            })}
        </ul>
      </section>

      <section className="mx-10 mb-12">
        <TitleButton
          title="나의 제주의 별"
          link="#"
          count={comment.length}
          section="댓글"
          onClick={handleShowAll('comment')}
          showMore={showAllComment}
        />
        <hr />
        <ul className="w-11/12 mx-auto my-10">
          {comment?.length === 0 && (
            <>
              <Link to="/content">
                <ProfileComment
                  src="/jejuImage5.jpg"
                  alt="제주 바다"
                  date="2023-09-06"
                  comment="제주를 향한 당신의 별을 우리에게 나누어주세요"
                />
              </Link>
            </>
          )}
          {!showAllComment &&
            comment?.slice(0, 5).map((item) => {
              return (
                <Link to={`/content/${item.contentId}`} key={item.id}>
                  <ProfileComment
                    src={getPbImageURL(item.expand.contentId, 'photo')}
                    alt={item.title}
                    date={item.updated.split(' ')[0]}
                    comment={item.comment}
                  />
                </Link>
              );
            })}
          {showAllComment &&
            comment?.map((item) => {
              return (
                <Link to={`/content/${item.contentId}`} key={item.id}>
                  <ProfileComment
                    src={getPbImageURL(item.expand.contentId, 'photo')}
                    alt={item.title}
                    date={item.updated.split(' ')[0]}
                    comment={item.comment}
                  />
                </Link>
              );
            })}
        </ul>
      </section>
    </>
  );
}
