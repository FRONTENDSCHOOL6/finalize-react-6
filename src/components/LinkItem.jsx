import { Link } from 'react-router-dom';

export default function LinkItem({ children, href, className }) {
  return (
    <Link href={href} className={className ? className : ''}>{children}</Link>
  )
}