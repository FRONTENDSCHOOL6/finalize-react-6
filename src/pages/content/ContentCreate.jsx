import pb from '@/api/pocketbase';
import photo from '@/assets/image.svg';
import right from '@/assets/right_white.svg';
import PageHead from '@/components/PageHead';
import ContentTitle from '@/components/content/ContentTitle';
import TagSelect from '@/components/content/TagSelect';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContentCreate() {
  const navigate = useNavigate();

  const [fileImages, setFileImages] = useState(null);

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const locationRef = useRef(null);
  const tagRef = useRef(null);
  const photoRef = useRef(null);

  const handleFileUpload = (e) => {
    const { files } = e.target;
    const fileImages = Array.from(files).map((file) => ({
      image: URL.createObjectURL(file),
      label: file.name,
    }));
    setFileImages(fileImages);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const titleValue = titleRef.current.value;
    const contentValue = contentRef.current.value;
    const locationValue = locationRef.current.value;
    const photoValue = photoRef.current.files;

    console.log(titleValue, contentValue, locationValue, photoValue[0]);
    const formData = new FormData();

    formData.append('title', titleValue);
    formData.append('content', contentValue);
    formData.append('location', locationValue);
    if (photoValue) {
      formData.append('photo', photoValue[0]);
    }
    console.log(formData);

    try {
      await pb.collection('content').create(formData);
      navigate('/content');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHead title="Jeju All in One - 나만의 제주" />

      <ContentTitle title="제주, 나의 ⭐" />

      <form
        encType="multipart/form-data"
        ref={formRef}
        onSubmit={handleCreate}
        className="flex flex-col gap-2 items-center"
      >
        <div className="flex gap-10 mx-auto px-10 max-w-7xl mt-10 mb-32 min-w-[1000px]">
          {/* upload file */}
          <div className="relative w-[800px]">
            <label htmlFor="photo" className="sr-only">
              사진 등록
            </label>
            <input
              type="file"
              accept="*.jpg,*.png,*.jpeg,*.webp,*.avif"
              name="photo"
              id="photo"
              ref={photoRef}
              onChange={handleFileUpload}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            {!fileImages && (
              <img
                src={photo}
                alt="photo"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            )}
            <div className="flex gap-2 overflow-x-auto p-2 w-full min-w-[350px] h-full bg-slate-100">
              {fileImages?.map((file) => {
                return (
                  <img
                    key={file.label}
                    src={file.image}
                    alt={file.label}
                    className="w-full max-h-[350px] my-auto"
                  />
                );
              })}
            </div>
          </div>

          <div className="w-full flex flex-col gap-6">
            <div className="w-full">
              <label htmlFor="title" className="sr-only">
                제목
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="제목을 입력해주세요"
                ref={titleRef}
                className="w-full py-3 px-4 border rounded-md border-lightsand focus:outline-none focus:border-lightblue"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="content" className="sr-only">
                내용
              </label>
              <textarea
                type="text"
                id="content"
                name="content"
                placeholder="내용을 입력해주세요"
                ref={contentRef}
                className="w-full py-3 px-4 min-h-[100px] border rounded-md border-lightsand focus:outline-none focus:border-lightblue"
                required
              />
            </div>
            {/* input 버튼 클릭이나 클릭이 이루어지면 위치 검색 모달 띄우기 */}
            <div className="w-full relative">
              <label htmlFor="location" className="sr-only">
                위치 검색
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="위치 검색"
                ref={locationRef}
                className="w-full py-3 px-4 border rounded-md border-lightsand focus:outline-none focus:border-lightblue"
                required
              />
              <button className="bg-lightblue p-2 rounded-md absolute right-2 top-[50%] -translate-y-[50%] hover:bg-blue">
                <img src={right} alt="search" />
              </button>
            </div>

            <TagSelect />
            <button
              type="submit"
              className="text-white font-bold bg-lightblue px-4 py-3 rounded-md hover:bg-blue"
            >
              추억 등록
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
