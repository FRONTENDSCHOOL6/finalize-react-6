import pb from '@/api/pocketbase';
import PageHead from '@/components/PageHead';
import ShowMap from '@/components/ShowMap';
import Spinner from '@/components/Spinner';
import CommentItem from '@/components/content/CommentItem';
import AddComment from '@/components/content/AddComment';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/useAuthStore';
import { getPbImageURL } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useImmer } from 'use-immer';

export default function ContentDetail() {
  const contentInfoInit = {
    title: '',
    content: '',
    tag: '',
    customTag: '',
    location: null,
    address: null,
    created: '',
    nickname: '',
  };
  const { id } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const writerRef = useRef(null);
  const [photo, setPhoto] = useState();
  const [comment, setComment] = useState([]);
  const [contentInfo, setContentInfo] = useImmer(contentInfoInit);
  const [isLoading, setIsLoading] = useState(false);

  //# 댓글 추가 후 반영하기
  const [commentInfo, setCommentInfo] = useState();

  useEffect(() => {
    if (commentInfo) {
      // comment 배열에 commentInfo 객체를 추가
      setComment((prevComments) => [...prevComments, commentInfo]);
    }
  }, [commentInfo]);

  //# 댓글 삭제
  const [deletedCommentIds] = useState([]);
  const isCommentDeleted = (commentId) => deletedCommentIds.includes(commentId);

  useEffect(() => {
    async function getContent() {
      try {
        setIsLoading(true);
        const jejuContent = await pb
          .collection('content')
          .getOne(
            id,
            { expand: 'commentId,commentId.userId,userId' },
            { requestKey: 'string' }
          );

        const {
          title,
          content,
          tag,
          customTag,
          expand,
          location,
          address,
          created,
        } = jejuContent;

        setPhoto(getPbImageURL(jejuContent, 'photo'));

        setContentInfo((draft) => {
          draft.title = title;
          draft.content = content;
          draft.tag = tag;
          if (
            address !== 'null' &&
            address !== '' &&
            location !== 'null' &&
            location !== ''
          ) {
            draft.location = location;
            draft.address = address;
          }
          draft.customTag = customTag;
          draft.created = created.split(' ')[0];
          draft.nickname = expand.userId.nickname;
        });

        if (expand.commentId) setComment(expand.commentId);
        if (expand.userId) writerRef.current = expand.userId.username;
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    getContent();
  }, [id, contentInfo, setContentInfo]);

  if (isLoading) {
    return (
      <div className="grid place-content-center h-[100vh]">
        <Spinner size={160} />
      </div>
    );
  }

  const handleDelete = async () => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="w-full flex flex-col p-5 text-center gap-10">
            <p className="font-semibold text-lg mt-4">
              게시물을 삭제하시겠습니까 ?
            </p>
            <div className="flex justify-center items-center gap-5">
              <button
                onClick={async () => {
                  try {
                    const response = await pb.collection('content').delete(id);
                    if (response) {
                      await pb
                        .collection('user')
                        .update(user.id, { 'content-': response.id });
                    }
                    toast.remove(t.id);
                    navigate('/content/list');
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
      <PageHead title="Jeju All in One - 나만의 제주" />

      <section className="shadow-content mt-5 mb-20 px-20 py-20 gap-5 flex flex-col items-center mx-[15%] min-h-full rounded-md s:mx-[5%] s:p-5">
        <h2 className="sr-only">{contentInfo.title}</h2>
        {/* 사진 */}
        <article>
          <img
            src={photo}
            alt={contentInfo.title}
            className="w-full h-full object-cover max-h-[100vh]"
          />
        </article>
        {/* 내용 */}
        <article className="w-full py-2 px-4 rounded-md border border-gray-500">
          <p className="pb-3 font-bold flex justify-between s:flex-col">
            {contentInfo.title}
            <span className="font-light text-slate-800 text-right">
              #{contentInfo.tag}
              <br />
              {contentInfo.customTag && `#${contentInfo.customTag}`}
            </span>
          </p>
          <div className="pb-4 flex justify-between s:flex-col s:items-end">
            <p>{contentInfo.nickname}</p>
            <p>{contentInfo.created}</p>
          </div>
          <p className="w-full h-full resize-none whitespace-break-spaces">
            {contentInfo.content}
          </p>
        </article>
        {writerRef.current !== null && writerRef.current === user?.userId && (
          <div className="flex gap-2 ml-auto">
            <Link to={`/content/edit/${id}`}>
              <button
                className="border-2 border-blue text-darkblue py-2 px-4 rounded-lg font-semibold
              hover:text-white hover:bg-blue "
              >
                수정
              </button>
            </Link>
            <button
              className="bg-transparent text-red-500 border-2 border-red-500 py-2 px-4 rounded-lg
                font-semibold hover:border-2 hover:border-red-500 hover:bg-red-400 hover:text-white "
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        )}
      </section>

      {/* comment */}
      <section
        className={`flex flex-col justify-center text-center items-center mx-auto min-h-full max-w-[1200px] ${
          contentInfo.location ? 'pb-20' : ''
        }`}
      >
        {/* 댓글 등록 */}
        <div className="w-full flex flex-row gap-4 justify-between items-center px-[15%] s:px-[5%]">
          <AddComment contentId={id} onCommentInfoChange={setCommentInfo} />
        </div>

        {/* 댓글 달리는 영역 */}
        {comment?.length !== 0 && (
          <div className="w-full flex flex-col pt-10 px-[15%] s:px-[5%]">
            {comment?.map((item) => {
              if (isCommentDeleted(item.id)) {
                return null; // 삭제된 댓글은 숨김
              }
              return (
                <CommentItem
                  key={item.id}
                  writer={item.expand.userId.nickname}
                  comment={item.comment}
                  commentId={item.id}
                  onCommentChange={setComment}
                  commentTime={item.created}
                  // userInfo={item.expand.userId}
                  // contentInfo={contentInfo}
                  // id={id}
                />
              );
            })}
          </div>
        )}
      </section>
      {contentInfo.address !== null && contentInfo.location !== null && (
        <>
          <hr />
          <ShowMap
            address={contentInfo.address}
            location={contentInfo.location}
          />
        </>
      )}
    </>
  );
}
