import { func, number } from 'prop-types';

export default function PaginationButton({
  page,
  totalPages,
  setPage,
  setSearchParams,
}) {
  return (
    <section className="flex justify-center gap-5 my-10">
      <button
        onClick={() => {
          setPage((old) => Math.max(old - 1, 0));
          setSearchParams((searchParams) => {
            const page = searchParams.get('page');
            return { page: Number(page) - 1 };
          });
        }}
        disabled={page === 1}
        className="disabled:font-extralight font-bold"
      >
        <span className="sr-only">이전 페이지</span>
        &lt;
      </button>
      <span>
        {`${page}`}
        {totalPages !== 1 && totalPages !== 0 && ` / ${totalPages}`}
      </span>
      <button
        onClick={() => {
          setPage((old) => old + 1);
          setSearchParams((searchParams) => {
            const page = searchParams.get('page');
            return { page: Number(page) + 1 };
          });
        }}
        disabled={page === totalPages || totalPages === 0}
        className="disabled:font-extralight font-bold"
      >
        <span className="sr-only">이후 페이지</span>
        &gt;
      </button>
    </section>
  );
}

PaginationButton.propTypes = {
  page: number.isRequired,
  totalPages: number.isRequired,
  setPage: func.isRequired,
  setSearchParams: func.isRequired,
};
