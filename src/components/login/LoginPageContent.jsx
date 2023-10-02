import { node } from 'prop-types';
export default function LoginPageContent({ children }) {
  return <div className="flex flex-col min-h-[60vh]">{children}</div>;
}

LoginPageContent.propTypes = {
  children: node,
};
