import { DateTime } from "luxon";
import Link from "next/link";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import { useViewportSize } from "hooks/useViewportSize";
import media from "styles/media";

import { PostsData } from "types/content";

interface MostReadProps {
  contents: {
    title: string;
    posts: PostsData;
  };
}

export const MostRead = ({ contents }: MostReadProps) => {
  const { title, posts } = contents;

  const { width } = useViewportSize();

  return (
    <Root className="pt-5 h-100 d-flex flex-column">
      <h2 className="h6 sans-serif fw-bold text-black mb-4 mb-lg-5 ps-lg-4 ps-xl-5">
        {removeWidows(title)}
      </h2>
      <ArticleList className="ps-lg-4 ps-xl-5 flex-grow-1">
        {posts?.data?.map((post, i) => {
          if (post) {
            const {
              id,
              slug,
              title,
              summary,
              image,
              categories,
              published_at,
            } = post;

            const publishedDate = DateTime.fromSQL(published_at || "", { zone: process.env.TIMEZONE })
                                          .toFormat("dd LLLL yyyy");

            return (
              <Article key={id}>
                {categories && categories.length > 0 && (
                  <p className="subheading sm text-black pt-2">
                    <span>{categories[0]?.name?.toUpperCase()}</span>
                    {" // "}
                    <span>{categories[1]?.name?.toUpperCase()}</span>
                  </p>
                )}
                <Link href={`/articles/${slug}`} passHref>
                  <TitleLink>
                    <ListNumber className="h2 text-dark text-center">
                      {i + 1}
                    </ListNumber>
                    <h5>{title}</h5>
                  </TitleLink>
                </Link>
                {(publishedDate || summary) && (
                  <p className="text-dark mb-0">
                    {removeWidows(
                      (publishedDate || "") + (summary ? " - " + summary : "")
                    )}
                  </p>
                )}
              </Article>
            );
          }
        })}
      </ArticleList>
    </Root>
  );
};

const Root = styled.div`
  border-top: 1px solid var(--bs-gray-700);

  @media ${media.lg} {
    border-top: none;
  }
`;

const ArticleList = styled.div`
  padding-top: 0.5rem;

  @media ${media.lg} {
    border-left: 1px solid var(--bs-gray-700);
  }
`;

const Article = styled.article`
  border-bottom: 1px solid var(--bs-gray-500);
  padding-left: 2.5rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  @media ${media.sm} {
    padding-left: 3.5rem;
  }
`;

const TitleLink = styled.a`
  position: relative;
  display: block;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const ListNumber = styled.p`
  position: absolute;
  top: -0.25rem;
  left: -2.5rem;

  @media ${media.sm} {
    top: -0.75rem;
    left: -3.5rem;
  }

  @media ${media.md} {
    top: -1rem;
  }

  @media ${media.md} {
    top: -0.25rem;
  }
`;
