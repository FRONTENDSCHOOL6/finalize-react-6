import { string } from 'prop-types';

export default function ContentTitle({ title }) {
  return (
    <div className="flex py-2 items-center justify-center mt-5">
      <h2 className="text-blue text-4xl font-semibold">{title}</h2>
    </div>
  );
}

ContentTitle.propTypes = {
  title: string.isRequired,
};
