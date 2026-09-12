import { v4 as uuidv4 } from "uuid";

import { PageLink } from "./PageLink";
import { PrevNextLink } from "./PrevNextLink";

interface PaginationProps {
  current_page: number;
  last_page: number;
  scrollTarget: string;
  getCaseStories: (page?: number, year?: string) => void;
}
export const Pagination = ({
  current_page,
  last_page,
  scrollTarget,
  getCaseStories,
}: PaginationProps) => {
  // Middle pages
  const midPages = [
    { id: uuidv4(), page: current_page - 2 },
    { id: uuidv4(), page: current_page - 1 },
    { id: uuidv4(), page: current_page },
    { id: uuidv4(), page: current_page + 1 },
    { id: uuidv4(), page: current_page + 2 },
  ];
  const firstMidPage = midPages[0].page;
  const lastMidPage = [...midPages].pop()?.page || 0;

  // Filter out page numbers within range, excluding first and last pages.
  const midPagesFiltered = midPages.filter(
    (midPage) => midPage.page > 1 && midPage.page < last_page
  );

  // Generate dots
  const generateDots = (diff: number, page: number) => {
    if (diff === 2) {
      // If there is only one in-between page, display it as the page number
      return { page: page, text: page.toString() };
    } else if (diff > 2) {
      // If there are more in-between pages, display it as "..."
      return { page: page, text: "..." };
    }
    // Default (no in-between pages): don't show dots
    return { page: 0, text: "" };
  };

  // Start dots
  const startDotsDiff = midPages[0].page - 1;
  const startDotsPage = Math.ceil(1 + (firstMidPage - 2) / 2);
  const startDots = generateDots(startDotsDiff, startDotsPage);

  // End dots
  const endDotsDiff = last_page - lastMidPage;
  const endDotsPage =
    lastMidPage + Math.ceil((last_page - lastMidPage - 1) / 2);
  const endDots = generateDots(endDotsDiff, endDotsPage);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination align-items-center justify-content-center mb-md-0">
        <li className="page-item">
          <PrevNextLink
            type="prev"
            page={current_page !== 1 ? current_page - 1 : null}
            scrollTarget={scrollTarget}
            getCaseStories={getCaseStories}
          />
        </li>
        <li>
          <ul className="pagination flex-wrap justify-content-center">
            <li className={`page-item ${current_page === 1 ? "active" : ""}`}>
              <PageLink
                page={1}
                page_text={1}
                scrollTarget={scrollTarget}
                getCaseStories={getCaseStories}
              />
            </li>
            {startDots.page > 0 && (
              <li className={`page-item`}>
                <PageLink
                  page={startDots.page}
                  page_text={startDots.text}
                  scrollTarget={scrollTarget}
                  getCaseStories={getCaseStories}
                />
              </li>
            )}
            {midPagesFiltered.map((midPage) => (
              <li
                key={midPage.id}
                className={`page-item ${
                  current_page === midPage.page ? "active" : ""
                }`}
              >
                <PageLink
                  page={midPage.page}
                  page_text={midPage.page}
                  scrollTarget={scrollTarget}
                  getCaseStories={getCaseStories}
                />
              </li>
            ))}
            {endDots.page > 0 && (
              <li className={`page-item`}>
                <PageLink
                  page={endDots.page}
                  page_text={endDots.text}
                  scrollTarget={scrollTarget}
                  getCaseStories={getCaseStories}
                />
              </li>
            )}
            {last_page > 1 && (
              <li
                className={`page-item ${
                  current_page === last_page ? "active" : ""
                }`}
              >
                <PageLink
                  page={last_page}
                  page_text={last_page}
                  scrollTarget={scrollTarget}
                  getCaseStories={getCaseStories}
                />
              </li>
            )}
          </ul>
        </li>
        <li className="page-item">
          <PrevNextLink
            type="next"
            page={current_page !== last_page ? current_page + 1 : null}
            scrollTarget={scrollTarget}
            getCaseStories={getCaseStories}
          />
        </li>
      </ul>
    </nav>
  );
};
