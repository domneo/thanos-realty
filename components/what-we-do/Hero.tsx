import Image from "next/image";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

interface HeroProps {
  contents: {
    caption: string;
    title: string;
    subtitle: string;
  };
}

const Hero = ({ contents }: HeroProps) => {
  const { caption, title, subtitle } = contents;

  return (
    <Root className="container-fluid position-relative overflow-hidden d-flex align-items-center">
      <BgImageWrapper className="position-absolute top-0 bottom-0 start-0 end-0">
        <div className="position-relative w-100 h-100">
          <Image
            src={`/images/wwd-hero-bg.jpg`}
            alt="modern workplace"
            layout="fill"
            objectFit="cover"
            objectPosition="center bottom"
            priority
          />
        </div>
      </BgImageWrapper>
      <div className="container">
        <div className="row">
          <div className="col-md-11 col-lg-9 col-xl-8 col-xxl-7 ps-lg-5 ps-xxl-6">
            <p className="fw-bold text-white">{removeWidows(caption)}</p>
            <h1 className="h2 alt mb-4 mb-md-5 text-white">{title}</h1>
            <Subtitle className="sans-serif mb-0 text-white">
              {removeWidows(subtitle)}
            </Subtitle>
          </div>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.section`
  padding: 9rem 12px;

  @media ${media.md} {
    padding: 11rem 12px;
  }
`;

const BgImageWrapper = styled.div`
  z-index: -100;
`;

const Subtitle = styled.h6`
  border-left: 2px solid var(--bs-white);
  line-height: 1.5;
  padding: 0.25rem 0 0.5rem 1rem;

  @media ${media.sm} {
    padding: 0.25rem 0 0.5rem 1.5rem;
  }

  @media ${media.md} {
    padding: 0.25rem 0 0.5rem 2.5rem;
  }

  @media ${media.xl} {
    padding: 0.25rem 0 0.5rem 4rem;
  }
`;

export default Hero;
