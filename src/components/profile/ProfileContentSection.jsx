import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPbImageURL } from '@/utils';
import { fetchProfileContents } from '@/utils/fetchContents';
import Spinner from '@/components/Spinner';
import TitleButton from '../TitleButton';
import ContentItem from '../content/ContentItem';
import { bool, func } from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import PaginationButton from '../PaginationButton';

export default function ProfileContentSection({ showMore, setShowMore }) {
  const { user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [collection] = useState('content');
  const [page, setPage] = useState(() => {
    const page = searchParams.get('page');
    return page ? Number(page) : 1;
  });
  const [perPage] = useState(9);
  const [sort] = useState('-created');

  useEffect(() => {
    const page = searchParams.get('page');
    if (!page) setSearchParams({ page: 1 });
    if (page >= 2) setShowMore(true);
  }, [searchParams, setSearchParams, setShowMore, showMore]);

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['contents', sort, user, page, perPage, collection],
    queryFn: () =>
      fetchProfileContents({
        sort,
        filter: `userId='${user.id}'`,
        page,
        perPage,
        collection,
      }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Spinner className="mx-auto" />;
  }

  if (isError) {
    return <div role="alert">{error.toString()}</div>;
  }

  return (
    <section className="mx-10 pt-10">
      <TitleButton
        title="나의 제주"
        link="#"
        count={data?.items?.length}
        section="게시글"
        onClick={() => setShowMore(!showMore)}
        showMore={showMore}
      />
      <hr />
      <ul className="my-10 w-11/12 mx-auto contentContainer">
        {data?.items?.length === 0 && <ContentItem />}
        {!showMore &&
          data?.items?.slice(0, 3).map((item) => {
            return (
              <ContentItem
                key={item.id}
                content={item.id}
                title={item.title}
                count={item.commentId.length}
                customTag={item.customTag}
                src={getPbImageURL(item, 'photo')}
              />
            );
          })}
        {showMore &&
          data?.items?.map((item) => {
            return (
              <ContentItem
                key={item.id}
                content={item.id}
                title={item.title}
                count={item.commentId.length}
                customTag={item.customTag}
                src={getPbImageURL(item, 'photo')}
              />
            );
          })}
      </ul>
      {(showMore || page >= 2) && (
        <PaginationButton
          totalPages={data.totalPages}
          page={page}
          setPage={setPage}
          setSearchParams={setSearchParams}
        />
      )}
    </section>
  );
}

ProfileContentSection.propTypes = {
  showMore: bool,
  setShowMore: func,
};
