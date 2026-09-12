import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

import { PostsData } from "types/content";

interface RelatedArticlesProps {
  relatedPosts: PostsData;
}

const RelatedArticles = ({ relatedPosts }: RelatedArticlesProps) => {
  return (
    <section className="container-fluid py-5 py-md-6">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-12">
            <Heading className="sans-serif fw-bold text-black pb-3 mb-0">
              Related
            </Heading>
          </div>
        </div>
        <div className="row justify-content-center">
          {relatedPosts.data.map(
            ({ id, slug, image, categories, title, published_at, summary }) => {
              const publishedDate = DateTime.fromSQL(published_at || "", { zone: process.env.NEXT_PUBLIC_TIMEZONE })
                                            .toFormat("dd LLLL yyyy");
              return (
                <div key={id} className="col-md-10 col-lg-4 my-3">
                  <Link href={`/articles/${slug}`} passHref>
                    <Card>
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
                      <div className="pt-5 pb-4 px-4">
                        {categories && categories.length > 0 && (
                          <p className="subheading sm text-black">
                            {categories[0]?.name}
                            <span className="mx-2 mx-md-3">{"//"}</span>
                            {categories[1]?.name}
                          </p>
                        )}
                        {title && <h5>{title}</h5>}
                        {publishedDate && summary && (
                          <p className="mb-0 text-dark">
                            {removeWidows(
                              (publishedDate ? publishedDate + " - " : "") +
                                summary
                            )}
                          </p>
                        )}
                      </div>
                    </Card>
                  </Link>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

const Heading = styled.h5`
  border-bottom: 2px solid var(--bs-gray-1000);
`;

const Card = styled.a`
  display: block;
  text-decoration: none;
  background: var(--bs-white);
  border: 1px solid var(--bs-gray-200);
  transition: 0.3s all;

  &:hover,
  &:focus {
    background: var(--bs-gray-100);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--bs-gray-200);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;

  @media ${media.sm} {
    height: 280px;
  }

  @media ${media.md} {
    height: 320px;
  }

  @media ${media.lg} {
    height: 180px;
  }

  @media ${media.xl} {
    height: 220px;
  }

  @media ${media.xxl} {
    height: 260px;
  }
`;

export default RelatedArticles;
