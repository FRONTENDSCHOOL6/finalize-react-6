import { string } from 'prop-types';
import { Helmet } from 'react-helmet-async';

export default function PageHead({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

PageHead.propTypes = {
  title: string.isRequired,
};
