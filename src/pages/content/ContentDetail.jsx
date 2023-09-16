import pb from '@/api/pocketbase';
import PageHead from '@/components/PageHead';
import ShowMap from '@/components/ShowMap';
import CommentItem from '@/components/content/CommentItem';
import { useAuthStore } from '@/store/useAuthStore';
import AddComment from '@/components/content/AddComment';
import { getPbImageURL } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ContentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [photo, setPhoto] = useState();
  const [tag, setTag] = useState();
  const [customTag, setCustomTag] = useState();
  const [comment, setComment] = useState([]);
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const writerRef = useRef(null);

  const [contentId, setContentId] = useState();
  const [totalCommentInfo, setTotalCommentInfo] = useState();

  //# 댓글 추가 후 반영하기
  const [commentInfo, setCommentInfo] = useState();
  // console.log('commentInfo:', commentInfo);
  useEffect(() => {
    if (commentInfo) {
      // comment 배열에 commentInfo 객체를 추가
      setComment((prevComments) => [...prevComments, commentInfo]);
    }
  }, [commentInfo]);

  //# 댓글 삭제
  const [deletedCommentIds, setDeletedCommentIds] = useState([]);
  const isCommentDeleted = (commentId) => deletedCommentIds.includes(commentId);

  useEffect(() => {
    async function getContent() {
      try {
        const jejuContent = await pb
          .collection('content')
          .getOne(
            id,
            { expand: 'commentId,commentId.userId,userId' },
            { requestKey: 'string' }
          );

        // console.log('jejuContetent', jejuContent);

        const { title, content, tag, customTag, expand, location, address } =
          jejuContent;

        setPhoto(getPbImageURL(jejuContent, 'photo'));
        setContent(content);
        setTag(tag);
        setTitle(title);
        setLocation(location);
        setAddress(address);
        setCustomTag(customTag);

        setContentId(id);
        setTotalCommentInfo(jejuContent);

        if (expand) setComment(expand.commentId);
        if (expand) writerRef.current = expand.userId.username;
      } catch (error) {
        console.error(error);
      }
    }

    getContent();
  }, [id]);

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
                    await pb.collection('content').delete(id);
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

      <section className="shadow-content mt-5 mb-20 px-20 py-20 gap-5 flex flex-col items-center mx-[15%] min-h-full rounded-md">
        <h2 className="sr-only">{title}</h2>
        {/* 사진 */}
        <article className="min-w-[400px] ">
          <img src={photo} alt={title} className="w-full h-full object-cover" />
        </article>
        {/* 내용 */}
        <article className="w-full py-2 px-4 rounded-md border border-gray-500">
          <p className="pb-2 font-bold flex justify-between">
            {title}
            <span className="font-light">
              #{tag} {customTag && `#${customTag}`}
            </span>
          </p>
          {content}
        </article>
        {writerRef.current !== null && writerRef.current === user?.userId && (
          <div className="flex gap-2">
            <Link to={`/content/edit/${id}`}>
              <button className="bg-blue text-white py-2 px-4 rounded-lg">
                수정
              </button>
            </Link>
            <button
              className="bg-blue text-white py-2 px-4 rounded-lg"
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        )}
      </section>

      <hr className="hr h-2 border-2" />

      {/* comment */}
      <section className="py-20 flex flex-col justify-center text-center items-center mx-auto min-h-full max-w-[1200px]">
        {/* 댓글 등록 */}
        <div className="w-full flex flex-row gap-4 justify-between items-center px-[15%]">
          <AddComment contentId={id} onCommentInfoChange={setCommentInfo} />
        </div>

        {/* 댓글 달리는 영역 */}
        {comment?.length !== 0 && (
          <div className="w-full flex flex-col pt-10 px-[15%]">
            {comment?.map((item) => {
              if (isCommentDeleted(item.id)) {
                return null; // 삭제된 댓글은 숨김
              }
              return (
                <CommentItem
                  key={item.id}
                  // contentId={id}
                  writer={item.expand.userId.nickname}
                  comment={item.comment}
                  commentId={item.id}
                  onCommentChange={setComment}
                />
              );
            })}
          </div>
        )}
      </section>
      <hr />
      <ShowMap
        address={
          address && address !== 'null'
            ? address
            : '제주특별자치도 제주시 공항로 2'
        }
        location={location && location !== 'null' ? location : '제주국제공항'}
      />
    </>
  );
}
