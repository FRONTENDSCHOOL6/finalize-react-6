import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MainSlide() {
  const [slide, setSlide] = useState(0);
  const slides = [
    { src: '/mainSlide1.jpg', alt: '제주도 바다' },
    { src: '/mainSlide2.jpeg', alt: '제주도 풍경' },
    { src: '/mainSlide3.jpeg', alt: '제주도 하늘' },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 3 seconds

    return () => clearInterval(slideInterval); // Clear interval on component unmount
  }, [slide]);

  return (
    <article className="relative w-full" style={{ height: '50vh' }}>
      <img
        src={slides[slide].src}
        alt={slides[slide].alt}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <div
        className="bg-white/30 w-full absolute top-0 left-0"
        style={{ height: '50vh' }}
      ></div>
      <p className="absolute top-[calc(50%-120px)] left-[calc(50%-80px)] text-darkblue font-bold text-3xl">
        당신의 제주를 <br /> 우리의 제주로
      </p>
    </article>
  );
}
