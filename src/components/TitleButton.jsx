import { number, string } from 'prop-types';
import { Link } from 'react-router-dom';

export default function TitleButton({ title, link, count, section }) {
  let least = 3;
  if (section === '댓글') least = 10;

  return (
    <div className="flex justify-between mb-2">
      <h2 className="text-lg font-bold">{title}</h2>
      {count > least && (
        <button type="button">
          <Link to={link}>더보기</Link>
        </button>
      )}
    </div>
  );
}

TitleButton.propTypes = {
  title: string,
  link: string,
  count: number,
};
