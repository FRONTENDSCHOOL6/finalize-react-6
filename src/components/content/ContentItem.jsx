import { Link } from 'react-router-dom';

export default function ContentItem({ content }) {
  return (
    <Link to={`/content/${content}`}>
      <div className="relative">
        <figure className="imageContainer brightness-[0.85] overflow-hidden">
          <img
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover w-full h-full"
            src='./jejuImage1.jpg'
            alt="alt변수로"
          />
        </figure>
        <figcaption className="text-white/[.93] flex flex-col text-end absolute bottom-5 right-7">
          <span className="text-2xl">타이틀 자리</span>
          <span>⭐(100)</span>
        </figcaption>
      </div>
    </Link>
  );
}
