import pb from '@/api/pocketbase';
import photo from '@/assets/image.svg';
import PageHead from '@/components/PageHead';
import ContentTitle from '@/components/content/ContentTitle';
import { Map } from '@/components/Map';
import { colorStyles } from '@/components/content/colorStyles';
import { colourOptions } from '@/components/content/data/data';
import { useAuthStore } from '@/store/useAuthStore';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import toast from 'react-hot-toast';

export default function ContentCreate() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [fileImages, setFileImages] = useState(null);

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const customTagRef = useRef(null);
  const tagRef = useRef(null);
  const photoRef = useRef(null);
  const placeNameRef = useRef(null);
  const placeAddressRef = useRef(null);

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
    const tagValue = tagRef.current.value;
    const customTagValue = customTagRef.current.value;

    if (!tagValue) {
      toast('태그를 선택해주세요.', {
        position: 'top-center',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      return;
    }

    if (!photoValue[0]) {
      toast('사진을 등록해주세요.', {
        position: 'top-center',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      return;
    }

    const formData = new FormData();

    formData.append('title', titleValue);
    formData.append('content', contentValue);
    formData.append('location', placeNameRef.current);
    formData.append('address', placeAddressRef.current);
    formData.append('tag', tagValue);
    formData.append('customTag', customTagValue);
    formData.set('userId', pb.authStore.model.id);
    if (photoValue) {
      formData.append('photo', photoValue[0]);
    }

    try {
      const contentData = await pb.collection('content').create(formData);
      if (contentData) {
        await pb
          .collection('user')
          .update(user.id, { 'content+': contentData.id });
      }
      navigate('/content/list');
      toast('등록되었습니다.', {
        position: 'top-center',
        icon: '⭐',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    } catch (error) {
      console.error(error);
      alert('오류가 발생해 콘텐츠 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleNoSpace = () => {
    customTagRef.current.value = customTagRef.current.value.replace(
      /(\s+)/g,
      '_'
    );
  };

  const handleTypeSelect = (e) => {
    tagRef.current.value = e.value;
  };

  return (
    <>
      <PageHead title="Jeju All in One - 나만의 제주" />

      <ContentTitle title="제주, 나의 ⭐" />

      <form
        encType="multipart/form-data"
        onSubmit={handleCreate}
        className="flex flex-col gap-2 items-center"
      >
        <div className="flex w-4/5 gap-6 mx-auto px-10 mt-10 mb-32 min-w-[1000px] s:flex-col s:mx-10 s:min-w-full">
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
            <div className="flex gap-2 overflow-x-auto p-2 w-full min-w-[350px] h-full bg-slate-100 s:min-h-[350px] s:max-h-[1000px]">
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
                placeholder="제목을 입력해주세요(40자 이내)"
                ref={titleRef}
                maxLength={40}
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
                maxLength={2000}
                className="w-full py-3 px-4 min-h-[100px] border rounded-md border-gray focus:outline-none focus:border-lightblue s:h-48"
                required
              />
            </div>

            <Select
              className="z-10"
              options={colourOptions}
              styles={colorStyles}
              ref={tagRef}
              onChange={handleTypeSelect}
              placeholder="제주도 태그를 선택해주세요"
            />

            <input
              type="text"
              ref={customTagRef}
              onChange={handleNoSpace}
              maxLength={30}
              className="w-full py-3 px-4 border rounded-md border-gray-300 focus:outline-none focus:border-lightblue"
              placeholder="나만의 제주도 태그를 만들어주세요.(30자 이내, 예: #나의_사랑_제주도)"
            />

            <Map ref={{ placeNameRef, placeAddressRef }} />

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
