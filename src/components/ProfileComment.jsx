import { string } from 'prop-types';

export default function ProfileComment({ src, alt, comment, date }) {
  return (
    <>
      <li className="flex justify-between items-center mb-2">
        <img src={src} alt={alt} className="w-12 min-w-12" />
        <p className="w-20 text-center">⭐</p>
        <p className="w-4/5 overflow-hidden text-ellipsis whitespace-nowrap">
          {comment}
        </p>
        <time className="w-1/6 text-end overflow-hidden text-ellipsis whitespace-nowrap">
          {date}
        </time>
      </li>
    </>
  );
}

ProfileComment.propTypes = {
  src: string,
  alt: string,
  comment: string,
  date: string,
};
