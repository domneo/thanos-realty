import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { removeWidows as stringRemoveWidows } from "string-remove-widows";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

import { CaseStoryData } from "types/content";

interface Service {
  label?: string;
  value?: string;
}

interface LatestProps {
  contents: {
    caption: string;
    subheading: string;
    caseStory: CaseStoryData | null;
  };
}

export const Latest = ({ contents }: LatestProps) => {
  const { caption, subheading, caseStory } = contents;
  const {
    image,
    slug,
    title,
    size,
    precinct,
    services,
    published_at,
    summary,
  } = caseStory || {};

  const servicesArr: Service[] = services && JSON.parse(services);

  const publishedDate = DateTime.fromSQL(published_at || "", { zone: process.env.TIMEZONE })
                                .toFormat("dd LLLL yyyy");

  return (
    <div className="position-relative container-fluid py-4 py-md-5">
      {image && (
        <BgImageWrapper className="position-absolute top-0 bottom-0 start-0 end-0">
          <div className="position-relative w-100 h-100">
            <Image
              src={image}
              alt={title || ""}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        </BgImageWrapper>
      )}
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-lg-8 col-xl-7 col-xxl-6">
            <Content className="position-relative">
              {caption && (
                <Caption className="position-absolute d-inline-block bg-primary">
                  <span className="subheading sm text-white">{caption}</span>
                </Caption>
              )}
              <Line />
              {subheading && (
                <p className="subheading sm text-dark mt-4 mt-lg-2">
                  {subheading}
                </p>
              )}
              {title && (
                <Link href={`/case-stories/${slug || ""}`} passHref>
                  <TitleLink>
                    <h3 className="mb-4">{title}</h3>
                  </TitleLink>
                </Link>
              )}
              {(precinct || size || servicesArr) && (
                <p className="lg text-black">
                  {precinct && (
                    <span className="d-inline-block">
                      {
                        stringRemoveWidows(precinct, {
                          convertEntities: false,
                          minWordCount: 3,
                        }).res
                      }
                      <span className="mx-2">•</span>
                    </span>
                  )}
                  {size && (
                    <span className="d-inline-block">
                      {
                        stringRemoveWidows(size, {
                          convertEntities: false,
                          minWordCount: 3,
                        }).res
                      }
                      <span className="mx-2">•</span>
                    </span>
                  )}
                  {servicesArr && servicesArr.length > 0 && (
                    <span className="d-inline-block">
                      {
                        stringRemoveWidows(
                          (servicesArr[0].label || "") +
                          ( (servicesArr.length > 1) ? " & Other Services" : ""),
                          {
                            convertEntities: false,
                            minWordCount: 3,
                          }
                        ).res
                      }
                    </span>
                  )}
                </p>
              )}
              {publishedDate && (
                <p className="text-dark mb-0">{removeWidows(publishedDate)}</p>
              )}
            </Content>
          </div>
        </div>
      </div>
    </div>
  );
};

const BgImageWrapper = styled.div`
  z-index: -1;
`;

const Content = styled.div`
  background: var(--bs-white);
  box-shadow: 0px 4px 48px 0px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  margin-top: 200px;

  @media ${media.sm} {
    padding: 2rem 3rem;
  }

  @media ${media.lg} {
    padding: 3.5rem 4rem;
    margin-top: 1.5rem;
  }
`;

const Caption = styled.div`
  padding: 0.75rem 2rem;
  position: absolute;
  top: 0;
  left: 1rem;
  transform: translateY(-50%);

  @media ${media.sm} {
    left: 1.5rem;
  }
`;

const Line = styled.div`
  position: absolute;
  left: 0;
  margin-top: 35px;
  width: 1rem;
  height: 1px;
  background: var(--bs-gray-700);

  @media ${media.sm} {
    width: 1.5rem;
  }

  @media ${media.lg} {
    margin-top: 19px;
    width: 2rem;
  }
`;

const TitleLink = styled.a`
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;
