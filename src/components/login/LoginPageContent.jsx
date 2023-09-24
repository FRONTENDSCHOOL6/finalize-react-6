import { node } from 'prop-types';
export default function LoginPageContent({ children }) {
  return <div className="flex flex-col">{children}</div>;
}

LoginPageContent.propTypes = {
  children: node,
};
