import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

import { CategoryData } from "types/content";

interface ArticleProps {
  index?: number;
  slug?: string;
  title?: string;
  summary?: string;
  image?: string;
  categories?: CategoryData[];
  publishedDate?: string;
}

const Article = ({
  index,
  slug,
  title,
  summary,
  image,
  categories,
  publishedDate,
}: ArticleProps) => (
  <Root>
    <Link href={`/articles/${slug}`} passHref>
      <ImageWrapper title={title}>
        {/* TODO: placeholder image */}
        <Image
          src={image || ""}
          alt={title}
          layout="fill"
          objectFit="cover"
          objectPosition={"center"}
          priority={index === 0}
        />
      </ImageWrapper>
    </Link>
    <ArticleDetails>
      {categories && categories.length > 0 && (
        <div className="mb-2 mb-md-3">
          <Category className="d-inline-block">
            {categories[0]?.name?.toLowerCase()}
          </Category>
          {categories.length > 1 && (
            <Category className="d-inline-block">
              and {categories.length - 1} others
            </Category>
          )}
        </div>
      )}
      <Link href={`/articles/${slug}`} passHref>
        <TitleLink title={title}>
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
    </ArticleDetails>
  </Root>
);

const Root = styled.article`
  border: 1px solid var(--bs-gray-200);
`;

const ImageWrapper = styled.a`
  position: relative;
  display: block;
  width: 100%;
  min-height: 150px;
  aspect-ratio: 1.7777;

  @media ${media.md} {
    min-height: 240px;
    aspect-ratio: 1.4;
  }

  @media ${media.lg} {
    min-height: 320px;
  }

  @media ${media.xl} {
    min-height: 180px;
  }
`;

const ArticleDetails = styled.div`
  padding: 1.25rem 1.5rem;

  @media ${media.sm} {
    padding: 1.5rem 1.75rem;
  }

  @media ${media.md} {
    padding: 1.5rem 2rem;
  }

  @media ${media.xl} {
    padding: 2rem 2.5rem;
  }
`;

const Category = styled.div`
  display: inline-block;
  border-radius: 0.75rem;
  padding: 0.25rem 0.75rem;
  margin: 0 0.5rem 0.5rem 0;
  background: var(--bs-gray-200);
  color: var(--bs-gray-700);

  @media ${media.lg} {
    border-radius: 1rem;
    padding: 0.5rem 1rem;
  }
`;

const TitleLink = styled.a`
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export default Article;
