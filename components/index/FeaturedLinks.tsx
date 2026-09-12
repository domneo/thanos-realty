import Image from "next/image";
import styled from "styled-components";

import media from "styles/media";

import FeatureCard from "./FeaturedLinks/FeatureCard";

interface FeaturedLinksContent {
  subheading: string;
  title: string;
  summary: string;
  link: string;
}

interface FeaturedLinksProps {
  contents: FeaturedLinksContent[];
}

const FeaturedLinks = ({ contents }: FeaturedLinksProps) => {
  return (
    <Root className="container-fluid position-relative overflow-hidden">
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-2 g-4 g-md-5">
          {contents.map((content, index) => (
            <FeatureCardWrapper
              key={content.title}
              className={`col ${
                index === 1 || index === 2 ? "over-ellipse" : ""
              }`}
            >
              <FeatureCard
                subheading={content.subheading}
                title={content.title}
                summary={content.summary}
                link={content.link}
              />
            </FeatureCardWrapper>
          ))}
          <BgImageWrapper className="position-absolute top-0 bottom-0 start-0 end-0 p-0 m-0 w-100">
            <div className="position-relative w-100 h-100">
              <Image
                src={`/images/featuredlinks-ellipses.svg`}
                alt={`ellipses`}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </BgImageWrapper>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.section`
  padding-top: 96px;
  padding-bottom: 96px;

  @media ${media.xxl} {
    padding-top: 144px;
    padding-bottom: 144px;
  }
`;

const FeatureCardWrapper = styled.div`
  z-index: 0;

  &.over-ellipse {
    z-index: 100;
  }
`;

const BgImageWrapper = styled.div`
  max-width: none;
  z-index: 50;
  pointer-events: none;
`;

export default FeaturedLinks;
