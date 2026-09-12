import { DateTime } from "luxon";
import Image from "next/image";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

import { ShareLinks } from "./ShareLinks";

import { MemberData } from "types/content";

const Header = ({
  image,
  title,
  summary,
  author,
  published_at,
  categories,
}: ArticleHeaderProps) => {
  const publishedDate = DateTime.fromSQL(published_at || "", {
    zone: process.env.TIMEZONE,
  }).toFormat("dd LLLL yyyy");

  return (
    <Root className="container-fluid overflow-hidden">
      <div className="container">
        <div className="row">
          <div className="col px-0 px-lg-3">
            <Headline className="alt text-black">
              <span className="bg-white px-2 px-md-4">{title}</span>
            </Headline>
          </div>
        </div>
        <ImageRow className="row justify-content-center">
          <div className="col-lg-10 px-0">
            <ImageWrapper>
              {image && (
                <Image
                  src={image}
                  alt={title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition={"center"}
                />
              )}
            </ImageWrapper>
          </div>
        </ImageRow>
        {summary && (
          <div className="row">
            <div className="col-lg-7 offset-lg-1 px-0">
              <Summary>
                <p className="d-inline-block bg-white h5 sans-serif fw-bold text-black mb-2 pt-4 px-3">
                  {removeWidows(summary)}
                </p>
              </Summary>
            </div>
          </div>
        )}
        <div className="row justify-content-center mt-3 mb-4 mb-lg-5">
          <div className="col-lg-10 px-0 py-2 d-flex flex-column flex-lg-row justify-content-between">
            <div className="px-lg-3 mt-3 mt-lg-0">
              <div className="d-flex align-items-start">
                {author && (
                  <AuthorImage>
                    <Image
                      src={author.image || ""}
                      alt={
                        author.first_name && author.last_name
                          ? author.first_name + author.last_name
                          : ""
                      }
                      layout="fill"
                      objectFit="cover"
                      objectPosition={"center"}
                    />
                  </AuthorImage>
                )}
                <Meta className="mb-0 mt-2 ms-3">
                  {author && `${author.first_name} ${author.last_name}`}
                  {author?.position && (
                    <em>
                      , {author.position}{" "}
                    </em>
                  )}
                  <span className="mx-2">|</span>
                  <span className="d-inline-block">{publishedDate}</span>
                  {categories &&
                    categories.length > 0 &&
                    categories.map((category) => {
                      return (
                        <span key={category.id}>
                          <span className="mx-2">|</span>
                          {category.name}
                        </span>
                      );
                    })}
                </Meta>
              </div>
            </div>
            <div className="flex-shrink-0 d-flex align-items-start justify-content-end mt-4 mt-lg-0">
              <ShareLinks title={title} summary={summary} />
            </div>
          </div>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.header`
  padding: 8rem 1rem 0;

  @media ${media.md} {
    padding: 10rem 1rem 0;
  }
`;

const Headline = styled.h1`
  margin-bottom: 1rem;

  @media ${media.sm} {
    margin-bottom: -2rem;
  }

  @media ${media.md} {
    margin-bottom: -3rem;
  }

  span {
    box-decoration-break: clone;
  }
`;

const ImageRow = styled.div`
  pointer-events: none;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  z-index: -1;

  @media ${media.sm} {
    height: 320px;
  }

  @media ${media.md} {
    height: 400px;
  }

  @media ${media.lg} {
    height: 440px;
  }

  @media ${media.xl} {
    height: 480px;
  }
`;

const Summary = styled.div`
  margin-top: 0;

  @media ${media.lg} {
    margin-top: -4rem;
  }

  p {
    line-height: 1.5;
  }
`;

const Meta = styled.p`
  color: var(--bs-gray-700);
`;

const AuthorImage = styled.div`
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
`;

interface ArticleHeaderProps {
  image?: string;
  title?: string;
  summary?: string;
  author?: MemberData;
  published_at?: string;
  categories?: {
    id?: string;
    name?: string;
    slug?: string;
  }[];
}

export default Header;
