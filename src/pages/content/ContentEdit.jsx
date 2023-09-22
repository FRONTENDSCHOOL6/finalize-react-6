import pb from '@/api/pocketbase';
import { Map } from '@/components/Map';
import PageHead from '@/components/PageHead';
import ContentTitle from '@/components/content/ContentTitle';
import { colorStyles } from '@/components/content/colorStyles';
import { colourOptions } from '@/components/content/data/data';
import { useAuthStore } from '@/store/useAuthStore';
import { getPbImageURL } from '@/utils';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

pb.autoCancellation(false);

const contentData = {
  title: '',
  content: '',
  photo: '',
  tag: '',
  customTag: '',
  comment: '',
  location: '',
  address: '',
};

export default function ContentEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthStore();

  const [initialImage, setInitialImage] = useState(null);
  const [fileImages, setFileImages] = useState([]);
  const [placeName, setPlaceName] = useState();
  const [placeAddress, setPlaceAddress] = useState();
  const [selectedTag, setSelectedTag] = useState();

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const customTagRef = useRef(null);
  const tagRef = useRef(null);
  const photoRef = useRef(null);
  const placeNameRef = useRef(null);
  const placeAddressRef = useRef(null);

  useLayoutEffect(() => {
    async function getContent() {
      try {
        const jejuContent = await pb
          .collection('content')
          .getOne(id, { expand: 'userId' }, { requestKey: 'string' });
        const { title, content, tag, customTag, location, address } =
          jejuContent;

        contentData.title = titleRef.current.value = title;
        contentData.content = contentRef.current.value = content;
        contentData.customTag = customTagRef.current.value = customTag;
        const photoUrl = (contentData.photo = getPbImageURL(
          jejuContent,
          'photo'
        ));
        setInitialImage({ image: photoUrl, label: photoUrl });

        contentData.tag = tagRef.current.value = tag;
        setSelectedTag(colourOptions.findIndex((e) => e.value == tag));

        contentData.location = placeNameRef.current.value = location;
        contentData.address = placeAddressRef.current.value = address;
      } catch (error) {
        if (!(error in DOMException)) {
          console.error();
        }
      }
    }
    getContent();
  }, [id]);

  useEffect(() => {
    setPlaceName(placeNameRef.current);
  }, [placeAddressRef, placeNameRef]);

  const handleFileChange = (e) => {
    const { files } = e.target;
    const fileImages = Array.from(files).map((file) => ({
      image: URL.createObjectURL(file),
      label: file.name,
    }));
    setFileImages(fileImages);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const titleValue = titleRef.current.value;
    const contentValue = contentRef.current.value;
    const photoValue = photoRef.current.files;
    const tagValue = tagRef.current.value;
    const customTagValue = customTagRef.current.value;

    if (!tagRef) {
      toast('태그를 선택해주세요.', {
        position: 'top-center',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
    }

    if (!initialImage && photoValue.length <= 0) {
      toast('사진을 등록해주세요.', {
        position: 'top-center',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
    }

    const formData = new FormData();

    formData.append('title', titleValue);
    formData.append('content', contentValue);
    formData.append('location', placeNameRef.current);
    formData.append('address', placeAddressRef.current);
    console.log('selectedTag', selectedTag)
    console.log('tagValue',tagValue);
    if (tagValue === undefined) {
      formData.append('tag', selectedTag);
    } else {
      formData.append('tag', tagValue);
    }

    formData.append('customTag', customTagValue);

    if (photoValue.length > 0) {
      formData.append('photo', photoValue[0]);
    }

    try {
      await pb.collection('content').update(id, formData);
      navigate('/content/list');
    } catch (error) {
      console.error(error);
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

    return true;
  };

  return (
    <>
      <PageHead title="Jeju All in One - 나만의 제주 수정 페이지" />

      <ContentTitle title="제주, 나의 ⭐" />

      <form
        encType="multipart/form-data"
        ref={formRef}
        onSubmit={handleUpdate}
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
              onChange={handleFileChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex gap-2 overflow-x-auto p-2 w-full min-w-[350px] h-full bg-slate-100">
              {!fileImages.length && initialImage ? (
                <img
                  key={initialImage.label}
                  src={initialImage.image}
                  alt={initialImage.label}
                  className="m-auto bg-slate-100 max-h-[660px]"
                />
              ) : (
                fileImages.map((file) => (
                  <img
                    key={file.label}
                    src={file.image}
                    alt={file.label}
                    className="m-auto bg-slate-100 max-h-[660px]"
                  />
                ))
              )}
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
              ref={tagRef}
              key={colourOptions[selectedTag]}
              defaultValue={colourOptions[selectedTag]}
              onChange={handleTypeSelect}
              placeholder="제주도 태그를 선택해주세요"
            />

            <input
              type="text"
              ref={customTagRef}
              onChange={handleNoSpace}
              className="w-full py-3 px-4 border rounded-md border-gray-300 focus:outline-none focus:border-lightblue"
              placeholder="나만의 제주도 태그를 만들어주세요.(예: #나의_사랑_제주도)"
            />

            <Map ref={{ placeNameRef, placeAddressRef }} />
            <div>{placeName}</div>

            <button
              type="submit"
              className="text-white font-bold bg-lightblue px-4 py-3 rounded-md hover:bg-blue"
            >
              수정 완료
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
