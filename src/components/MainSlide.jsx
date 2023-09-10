import { useState, useEffect } from 'react';

export default function MainSlide() {
  const [slide, setSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    { src: '/mainSlide1.jpg', alt: '제주도 바다' },
    { src: '/mainSlide2.jpeg', alt: '제주도 풍경' },
    { src: '/mainSlide3.jpeg', alt: '제주도 하늘' },
  ];

  useEffect(() => {
    let slideInterval;

    if (isPlaying) {
      slideInterval = setInterval(() => {
        setSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }

    return () => clearInterval(slideInterval);
  }, [isPlaying]);

  return (
    <article className="relative w-full" style={{ height: '60vh' }}>
      <img
        src={slides[slide].src}
        alt={slides[slide].alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div className="bg-white/30 w-full h-full absolute top-0 left-0"></div>
      <p className="absolute top-[calc(50%-120px)] left-[calc(50%-80px)] text-darkblue font-bold text-3xl">
        당신의 제주를 <br /> 우리의 제주로
      </p>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="rounded-full"
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          width: '30px',
          height: '30px',
        }}
      >
        {isPlaying ? (
          <img src="/pause.png" alt="중지" />
        ) : (
          <img src="/play.png" alt="재생" />
        )}
      </button>
    </article>
  );
}
