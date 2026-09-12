/**
 * Reproduces the envelope the original (Laravel) API returned, because the
 * front end reads `current_page` / `last_page` / `total` straight off it.
 */
export interface Paginator<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: { url: string | null; label: string; active: boolean }[];
  next_page_url: string | null;
  path: string;
  per_page: string;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export const DEFAULT_PER_PAGE = 20;

export const paginate = <T>(
  rows: T[],
  {
    page = 1,
    perPage = DEFAULT_PER_PAGE,
    path,
  }: { page?: number; perPage?: number; path: string }
): Paginator<T> => {
  const total = rows.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(1, page), lastPage);
  const offset = (currentPage - 1) * perPage;
  const data = rows.slice(offset, offset + perPage);

  const url = (n: number) => `${path}?page=${n}`;
  const links: Paginator<T>["links"] = [
    {
      url: currentPage > 1 ? url(currentPage - 1) : null,
      label: "&laquo; Previous",
      active: false,
    },
  ];
  for (let n = 1; n <= lastPage; n++) {
    links.push({ url: url(n), label: String(n), active: n === currentPage });
  }
  links.push({
    url: currentPage < lastPage ? url(currentPage + 1) : null,
    label: "Next &raquo;",
    active: false,
  });

  return {
    current_page: currentPage,
    data,
    first_page_url: url(1),
    from: data.length ? offset + 1 : null,
    last_page: lastPage,
    last_page_url: url(lastPage),
    links,
    next_page_url: currentPage < lastPage ? url(currentPage + 1) : null,
    path,
    per_page: String(perPage),
    prev_page_url: currentPage > 1 ? url(currentPage - 1) : null,
    to: data.length ? offset + data.length : null,
    total,
  };
};
