import { scroller } from "react-scroll";

import PaginationChevronLeftIcon from "components/icons/PaginationChevronLeftIcon";
import PaginationChevronRightIcon from "components/icons/PaginationChevronRightIcon";

interface PrevNextLinkProps {
  type: "prev" | "next";
  page: number | null;
  scrollTarget: string;
  getCaseStories: (page?: number, year?: string) => void;
}

export const PrevNextLink = ({
  type,
  page,
  scrollTarget,
  getCaseStories,
}: PrevNextLinkProps) => {
  const onClickHandler = (page: number) => {
    getCaseStories(page);

    scroller.scrollTo(scrollTarget, {
      offset: 0,
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <button
      className={`page-link ${page ? "" : "disabled"}`}
      aria-label="Previous"
      aria-disabled={page ? "false" : "true"}
      tabIndex={page ? undefined : -1}
      onClick={() => onClickHandler(page || 1)}
    >
      {type === "prev" ? (
        <PaginationChevronLeftIcon />
      ) : (
        <PaginationChevronRightIcon />
      )}
    </button>
  );
};
