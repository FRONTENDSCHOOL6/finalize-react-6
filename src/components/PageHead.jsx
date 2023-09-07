import { Helmet } from "react-helmet-async";

export default function PageHead({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}