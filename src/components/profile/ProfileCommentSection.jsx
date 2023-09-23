import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPbImageURL } from '@/utils';
import { useAuthStore } from '@/store/useAuthStore';
import Spinner from '@/components/Spinner';
import TitleButton from '../TitleButton';
import ProfileComment from '../ProfileComment';
import { bool, func } from 'prop-types';
import { fetchComments } from '@/utils/fetchContents';

export default function ProfileCommentSection({ showMore, setShowMore }) {
  const { user } = useAuthStore();
  const [collection] = useState('comment');
  const [sort] = useState('-created');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['comment', sort, user, collection],
    queryFn: () =>
      fetchComments({
        sort,
        filter: `userId='${user.id}'`,
        collection,
      }),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  return status === 'loading' ? (
    <Spinner className="mx-auto" />
  ) : status === 'error' ? (
    <div role="alert">{error.toString()}</div>
  ) : (
    <>
      <section className="mx-10 mb-12">
        <TitleButton
          title="나의 제주의 별"
          link="#"
          count={data.pages[0].items.length}
          section="댓글"
          onClick={() => setShowMore(!showMore)}
          showMore={showMore}
        />
        <hr />
        <ul className="w-11/12 mx-auto my-10">
          {showMore && data.pages[0].items.length === 0 && (
            <>
              <Link to="/content">
                <ProfileComment
                  src="https://frontendschool6.github.io/finalize-react-6/jejuImage5.jpg"
                  alt="제주 바다"
                  date="2023-09-06"
                  comment="제주를 향한 당신의 별을 우리에게 나누어주세요"
                />
              </Link>
            </>
          )}
          {!showMore &&
            data?.pages?.map((group, i) => {
              return (
                <React.Fragment key={i}>
                  {group?.items?.slice(0, 5).map((project) => {
                    return (
                      <Link
                        to={`/content/${project.contentId}`}
                        key={project.id}
                      >
                        <ProfileComment
                          src={getPbImageURL(project.expand.contentId, 'photo')}
                          alt={project.title}
                          date={project.created.split(' ')[0]}
                          comment={project.comment}
                        />
                      </Link>
                    );
                  })}
                </React.Fragment>
              );
            })}
          {showMore &&
            data?.pages?.map((group, i) => {
              return (
                <React.Fragment key={i}>
                  {group?.items?.map((project) => {
                    return (
                      <Link
                        to={`/content/${project.contentId}`}
                        key={project.id}
                      >
                        <ProfileComment
                          src={getPbImageURL(project.expand.contentId, 'photo')}
                          alt={project.title}
                          date={project.created.split(' ')[0]}
                          comment={project.comment}
                        />
                      </Link>
                    );
                  })}
                </React.Fragment>
              );
            })}
          {showMore && (
            <>
              <div>
                <button
                  className="w-full py-2 font-semibold"
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? '로딩 중입니다.'
                    : hasNextPage
                    ? 'Load More'
                    : `- 댓글이 더 이상 없습니다. 우리의 제주에 당신의 별을 더욱 나눠주세요 -`}
                </button>
              </div>
              <div>
                {isFetching && !isFetchingNextPage ? (
                  <p className="w-full text-center font-semibold">
                    - 추가된 댓글을 확인하고 있습니다 -
                  </p>
                ) : null}
              </div>
            </>
          )}
        </ul>
      </section>
    </>
  );
}

ProfileCommentSection.propTypes = {
  showMore: bool,
  setShowMore: func,
};
