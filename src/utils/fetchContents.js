export async function fetchContents(options) {
  let queryParams = '';

  if (options.filter === `(tag='')`) {
    queryParams = `?sort=${options.sort}&page=${options.page}&perPage=${options.perPage}`;
  } else {
    queryParams = `?${Object.entries(options)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')}`;
  }

  const response = await fetch(
    `${import.meta.env.VITE_PB_API}/collections/content/records${queryParams}`
  );
  return await response.json();
}

export async function fetchComments(options) {
  let queryParams = '';
  queryParams = `?sort=${options.sort}&filter=${options.filter}&expand=contentId`;
  const response = await fetch(
    `${import.meta.env.VITE_PB_API}/collections/${
      options.collection
    }/records${queryParams}`
  );
  return await response.json();
}

export async function fetchProfileContents(options) {
  let queryParams = '';
  queryParams = `?sort=${options.sort}&filter=${options.filter}&page=${options.page}&perPage=${options.perPage}`;
  const response = await fetch(
    `${import.meta.env.VITE_PB_API}/collections/${
      options.collection
    }/records${queryParams}`
  );
  return await response.json();
}
