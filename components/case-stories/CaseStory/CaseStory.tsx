import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

import { CategoryData } from "types/content";

interface Service {
  label?: string;
  value?: string;
}

interface CaseStoryProps {
  index?: number;
  slug?: string;
  title?: string;
  precinct?: string;
  size?: string;
  services?: string;
  image?: string;
  categories?: CategoryData[];
  publishedDate?: string;
}

const CaseStory = ({
  index,
  slug,
  title,
  precinct,
  size,
  services,
  image,
  categories,
  publishedDate,
}: CaseStoryProps) => {
  const servicesArr: Service[] = services && JSON.parse(services);

  return (
    <Root className="d-flex flex-column h-100">
      <Link href={`/case-stories/${slug}`} passHref>
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
      <CaseStoryDetails className="h-100 d-flex flex-column justify-content-between">
        <div>
          <div className="mb-2 mb-md-3">
            <Category className="d-inline-block">
              {categories?.[0].name?.toLowerCase()}
            </Category>
            {categories && categories?.length > 1 && (
              <Category className="d-inline-block">
                and {categories.length - 1} others
              </Category>
            )}
          </div>
          <Link href={`/case-stories/${slug}`} passHref>
            <TitleLink title={title}>
              <h5>{title}</h5>
            </TitleLink>
          </Link>
        </div>
        <div>
          <p className="text-black mb-3">
            {precinct && (
              <span className="d-inline-block">
                {removeWidows(precinct)}
                <span className="mx-2">•</span>
              </span>
            )}
            {size && (
              <span className="d-inline-block">
                {removeWidows(size)}
                <span className="mx-2">•</span>
              </span>
            )}
            {servicesArr && servicesArr.length > 0 && (
              <span className="d-inline-block">
                {removeWidows(
                  (servicesArr[0].label || "") +
                    ((servicesArr.length > 1) ? " & Other Services" : "")
                )}
              </span>
            )}
          </p>
          <PublishedDate className="text-end mb-0">
            {publishedDate}
          </PublishedDate>
        </div>
      </CaseStoryDetails>
    </Root>
  );
};

const Root = styled.article`
  border: 1px solid var(--bs-gray-200);
`;

const ImageWrapper = styled.a`
  position: relative;
  display: block;
  width: 100%;
  min-height: 150px;
  aspect-ratio: 1.7777;
  flex-shrink: 0;

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

const CaseStoryDetails = styled.div`
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

const PublishedDate = styled.p`
  color: var(--bs-gray-700);
`;

export default CaseStory;
