import { useState } from 'react';

export default function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        type="button"
        className="text-sm rounded-full"
        onClick={openModalHandler}
      >
        &#62;
      </button>
      {isOpen ? (
        <div
          onClick={openModalHandler}
          className="fixed flex justify-center items-center bg-black bg-opacity-40 rounded-lg top-0 left-0 right-0 bottom-0 z-10"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            className="flex flex-col bg-white rounded-lg w-[500px]"
          >
            <button
              onClick={openModalHandler}
              className="bg-blue text-center text-xl text-white rounded-lg m-[10px] w-[30px] leading-[30px]"
            >
              X
            </button>
            {/* 내용 부분에 스크롤 추가 */}
            <div className="m-7 overflow-auto max-h-[400px]">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
