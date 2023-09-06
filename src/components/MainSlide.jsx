export default function MainSlide({ src, alt }) {
  return (
    <article className="relative">
      <img src={src} alt={alt} />
      <div className="bg-white/30 w-full h-full absolute top-0 left-0"></div>
      <p className="absolute top-[calc(50%-120px)] left-[calc(50%-80px)] text-darkblue font-bold text-3xl">
        당신의 제주를 <br /> 우리의 제주로
      </p>
    </article>
  );
}
