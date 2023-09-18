import { bool, func, number, string } from 'prop-types';
import { Link } from 'react-router-dom';

export default function TitleButton({
  title,
  link,
  count = 1,
  section,
  onClick,
  showMore,
}) {
  let least = 0;
  if (section === '게시글') least = 3;
  if (section === '댓글') least = 5;

  return (
    <div className="flex justify-between mb-2">
      <h2 className="text-lg font-bold">{title}</h2>
      {count > least && (
        <button type="button" onClick={onClick}>
          <Link to={link}>{!showMore ? '더보기' : '줄여보기'}</Link>
        </button>
      )}
    </div>
  );
}

TitleButton.propTypes = {
  title: string,
  link: string,
  count: number,
  section: string,
  onClick: func,
  showMore: bool,
};
