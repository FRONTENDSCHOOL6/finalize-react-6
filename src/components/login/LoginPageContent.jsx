import { node } from 'prop-types';
export default function LoginPageContent({ children }) {
  return (
    <div className="flex flex-col items-center justify-center">
      {children}
    </div>
  );
}

LoginPageContent.propTypes = {
  children: node,
};