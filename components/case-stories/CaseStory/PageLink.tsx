import { scroller } from "react-scroll";

interface PageLinkProps {
  page: number | null;
  page_text: string | number;
  scrollTarget: string;
  getCaseStories: (page?: number, year?: string) => void;
}

export const PageLink = ({
  page,
  page_text,
  scrollTarget,
  getCaseStories,
}: PageLinkProps) => {
  const onClickHandler = (page: number) => {
    getCaseStories(page);

    scroller.scrollTo(scrollTarget, {
      offset: -100,
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <button className="page-link" onClick={() => onClickHandler(page || 1)}>
      {page_text}
    </button>
  );
};
