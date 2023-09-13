import { string } from 'prop-types';
import { Link } from 'react-router-dom';

export default function ContentItem({
  src = '/jejuImage5.jpg',
  content = '',
  title = '당신의 제주를 나눠주세요',
  count = '99',
}) {
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
        <figcaption className="text-white flex flex-col text-end absolute bottom-0 w-full p-3 bg-black/40">
          <span className="text-xl w-3/4 ellipsis ml-auto">{title}</span>
          <span>⭐({count})</span>
        </figcaption>
      </div>
    </Link>
  );
}

ContentItem.propTypes = {
  src: string,
  content: string,
  title: string,
  count: string,
};
