import Link from "next/link";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

interface SlideContentProps {
  title?: string;
  description?: string;
  cta_link?: string;
  cta_text?: string;
  isActiveSlide: boolean;
}

const SlideContent = ({
  title,
  description,
  cta_link,
  cta_text,
  isActiveSlide,
}: SlideContentProps) => {
  return (
    <Root className="col-lg-10 col-xxl-7">
      <HeroContent className="d-flex flex-column justify-content-end">
        <HeroTitle className="h3">{title}</HeroTitle>
        {description && (
          <HeroDescription>{removeWidows(description)}</HeroDescription>
        )}
        {cta_link && cta_text && (
          <div>
            <Link href={cta_link} passHref>
              <a
                className="btn btn-primary btn-white"
                tabIndex={isActiveSlide ? undefined : -1}
              >
                {removeWidows(cta_text)}
              </a>
            </Link>
          </div>
        )}
      </HeroContent>
    </Root>
  );
};

const Root = styled.div`
  z-index: 1;
  height: 100%;

  @media ${media.sm} {
    height: auto;
  }
`;

const HeroContent = styled.div`
  background: rgba(35, 35, 35, 0.75);
  color: var(--bs-white);
  height: 100%;
  padding: 1.5rem 1.5rem 4rem;

  @media ${media.sm} {
    height: auto;
  }

  @media ${media.md} {
    padding: 2rem;
  }
`;

const HeroTitle = styled.h1`
  color: var(--bs-white);
`;

const HeroDescription = styled.p`
  line-height: 1.5;

  @media ${media.md} {
    line-height: 2;
  }
`;

export default SlideContent;
