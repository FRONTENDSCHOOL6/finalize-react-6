import { NavLink } from 'react-router-dom';

export default function MainContent({ src, alt, title }) {
  return (
    <article className="w-1/3 border-2 border-slate-300 border-solid rounded">
      <NavLink to="/content">
        <figure>
          <img src={src} alt={alt} />
          <figcaption className="py-4 pl-4 overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </figcaption>
        </figure>
      </NavLink>
    </article>
  );
}
