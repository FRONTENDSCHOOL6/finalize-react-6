import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/virtual';

export default function MainSlide() {
  // const [slide, setSlide] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    { src: '/mainSlide1.jpg', alt: '제주도 바다' },
    { src: '/mainSlide2.jpeg', alt: '제주도 풍경' },
    { src: '/mainSlide3.jpeg', alt: '제주도 하늘' },
  ];

  // useEffect(() => {
  //   let slideInterval;

  //   if (isPlaying) {
  //     slideInterval = setInterval(() => {
  //       setSlide((prev) => (prev + 1) % slides.length);
  //     }, 5000);
  //   }

  //   return () => clearInterval(slideInterval);
  // }, [isPlaying]);

  return (
    <article className="relative w-full h-[100vh]">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        speed={1500}
        parallax={true}
        className="w-full h-full object-cover"
      >
        {slides.map((slideContent, index) => (
          <SwiperSlide key={index} className="w-full h-full object-cover">
            <img
              src={slideContent.src}
              alt={slideContent.alt}
              className="w-full h-full object-cover"
            ></img>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="bg-white/30 w-full h-full absolute top-0 left-0 z-[1]">
        <p className="absolute top-[calc(50%-120px)] left-[calc(50%-80px)] text-darkblue font-bold text-3xl">
          당신의 제주를 <br /> 우리의 제주로
        </p>
      </div>

      {/* <img
        src={slides[slide].src}
        alt={slides[slide].alt}
        className="w-full h-full object-cover"
      />

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="rounded-full absolute bottom-[10px] right-[10px] w-[30px] h-[30px]"
      >
        {isPlaying ? (
          <img src="/pause.png" alt="중지" />
        ) : (
          <img src="/play.png" alt="재생" />
        )}
      </button> */}
    </article>
  );
}
