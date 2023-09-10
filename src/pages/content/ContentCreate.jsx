import pb from '@/api/pocketbase';
import photo from '@/assets/image.svg';
import PageHead from '@/components/PageHead';
import ContentTitle from '@/components/content/ContentTitle';
import { colorStyles } from '@/components/content/colorStyles';
import { colourOptions } from '@/components/content/data/data';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Map from '@/components/Map';

export default function ContentCreate() {
  const navigate = useNavigate();

  const [fileImages, setFileImages] = useState(null);
  const [tag, setTag] = useState();
  const [placeName, setPlaceName] = useState();
  const [placeAddress, setPlaceAddress] = useState();

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const customTagRef = useRef(null);
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
    const photoValue = photoRef.current.files;

    if (!placeName) return alert('위치를 등록해주세요.');
    else if (!tag) return alert('태그를 등록해주세요.');
    else if (!photoValue[0]) return alert('사진을 등록해주세요.');

    const formData = new FormData();

    formData.append('title', titleValue);
    formData.append('content', contentValue);
    formData.append('location', placeName);
    formData.append('address', placeAddress);
    formData.append('tag', tag);
    if (photoValue) {
      formData.append('photo', photoValue[0]);
    }

    try {
      await pb.collection('content').create(formData);
      navigate('/content');
    } catch (error) {
      console.error(error);
    }
  };

  const handleTypeSelect = (e) => {
    setTag(e.value);
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
        <div className="flex w-4/5 gap-6 mx-auto px-10 mt-10 mb-32 min-w-[1000px]">
          {/* upload file */}
          <div className="relative w-full flex-grow">
            <label htmlFor="photo" className="sr-only">
              사진 등록
            </label>
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/webp,image/avif"
              name="photo"
              id="photo"
              ref={photoRef}
              onChange={handleFileUpload}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex gap-2 overflow-x-auto p-2 w-full min-w-[350px] h-full bg-slate-100">
              {!fileImages && (
                <img
                  src={photo}
                  alt="photo"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              )}
              {fileImages?.map((file) => {
                return (
                  <img
                    key={file.label}
                    src={file.image}
                    alt={file.label}
                    className="m-auto bg-slate-100 max-h-[660px]"
                  />
                );
              })}
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 flex-grow">
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
                className="w-full py-3 px-4 border rounded-md border-gray-300 focus:outline-none focus:border-lightblue"
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
                className="w-full py-3 px-4 min-h-[100px] border rounded-md border-gray focus:outline-none focus:border-lightblue"
                required
              />
            </div>

            <Select
              className="z-10"
              options={colourOptions}
              styles={colorStyles}
              onChange={handleTypeSelect}
              placeholder="제주도 태그를 선택해주세요"
            />

            <input
              type="text"
              ref={customTagRef}
              className="w-full py-3 px-4 border rounded-md border-gray-300 focus:outline-none focus:border-lightblue"
              placeholder="나만의 제주도 태그를 만들어주세요.(예: #나의사랑제주도)"
            />

            <Map
              place={{ placeName, placeAddress }}
              setPlace={{ setPlaceName, setPlaceAddress }}
            />

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
