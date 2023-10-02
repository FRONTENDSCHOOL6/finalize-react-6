import { string } from 'prop-types';
import { Helmet } from 'react-helmet-async';

export default function PageHead({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`제주도, 여행, 음식, 경치, 한라산, 등산, 맛집, 비행기, ${keywords}`}
      />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${import.meta.env.VITE_DOMAIN}/jejuImage5.jpg`}
      />
      <meta property="og:url" content={`${import.meta.env.VITE_DOMAIN}/`} />
    </Helmet>
  );
}

PageHead.propTypes = {
  title: string.isRequired,
  keywords: string,
  description: string,
};
