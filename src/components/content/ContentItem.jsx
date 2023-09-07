import { Link } from 'react-router-dom';

export default function ContentItem({ src, content, title, count }) {
  return (
    <Link to={`/content/${content}`}>
      <div className="relative">
        <figure className="imageContainer brightness-[0.85] overflow-hidden">
          <img
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover w-full h-full"
            src={src}
            alt={title}
          />
        </figure>
        <figcaption className="text-white/[.93] flex flex-col text-end absolute bottom-5 right-7">
          <span className="text-2xl">{title}</span>
          <span>⭐({count})</span>
        </figcaption>
      </div>
    </Link>
  );
}
