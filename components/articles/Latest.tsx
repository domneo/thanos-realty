import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import { useViewportSize } from "hooks/useViewportSize";
import media from "styles/media";

import { PostsData } from "types/content";

interface LatestProps {
  contents: {
    title: string;
    posts: PostsData;
  };
}

export const Latest = ({ contents }: LatestProps) => {
  const { title, posts } = contents;

  const { width } = useViewportSize();

  return (
    <div className="pt-5">
      <h2 className="h6 sans-serif fw-bold text-black mb-4 mb-lg-5">
        {removeWidows(title)}
      </h2>
      <div className="pe-lg-5">
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
              <Article key={id} className="row">
                <div className="col-lg-5 mb-4 mb-lg-0 pe-lg-4">
                  <Link href={`/articles/${slug}`} passHref>
                    <ImageWrapper title={title}>
                      {/* TODO: placeholder image */}
                      <Image
                        src={image || ""}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        objectPosition={"center"}
                        priority={i === 0}
                      />
                    </ImageWrapper>
                  </Link>
                </div>
                <div className="col-lg-7">
                  <div className="mb-2 mb-md-3">
                    {categories && categories.length > 0 && (
                      <Category className="d-inline-block">
                        {categories[0]?.name?.toLowerCase()}
                      </Category>
                    )}
                    {categories && categories?.length > 1 && (
                      <Category className="d-inline-block">
                        and {categories.length - 1} others
                      </Category>
                    )}
                  </div>
                  <Link href={`/articles/${slug}`} passHref>
                    <TitleLink title={title}>
                      <h4>{title}</h4>
                    </TitleLink>
                  </Link>
                  {(publishedDate || summary) && (
                    <p className="text-dark mb-0">
                      {removeWidows(
                        (publishedDate || "") + (summary ? " - " + summary : "")
                      )}
                    </p>
                  )}
                </div>
              </Article>
            );
          }
        })}
      </div>
    </div>
  );
};

const Article = styled.article`
  border-bottom: 1px solid var(--bs-gray-500);
  padding-bottom: 2rem;
  margin-bottom: 2rem;

  &:last-child {
    border-bottom: none;
  }

  @media ${media.lg} {
    padding-bottom: 4rem;
    margin-bottom: 4rem;

    &:last-child {
      padding-bottom: 0;
      margin-bottom: 0;
    }
  }
`;

const ImageWrapper = styled.a`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  min-height: 150px;
  aspect-ratio: 1.7777;

  @media ${media.lg} {
    height: 320px;
  }

  @media ${media.xl} {
    height: 400px;
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
