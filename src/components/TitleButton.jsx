import { Link } from 'react-router-dom';

export default function TitleButton({ title, link }) {
  return (
    <div className="flex justify-between mb-2">
      <h2 className="text-lg font-bold">{title}</h2>
      <button type="button">
        <Link to={link}>더보기</Link>
      </button>
    </div>
  );
}
