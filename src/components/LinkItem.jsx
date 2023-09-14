import { Link } from 'react-router-dom';

export default function LinkItem({ children, link, className }) {
  return (
    <Link to={link} className={className ? className : ''}>{children}</Link>
  )
}