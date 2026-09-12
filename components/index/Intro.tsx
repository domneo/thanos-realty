import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

import AnimateOnScroll from "components/global/animateOnScroll";

interface IntroProps {
  contents: {
    introText?: string;
  };
}

const Intro = ({ contents }: IntroProps) => {
  const { introText } = contents;

  return (
    <Root className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <AnimateOnScroll animateIn="fadeIn">
              <p className="h2">{removeWidows(introText)}</p>
              <Line />
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.section`
  padding: 3rem 1rem;
  color: var(--bs-lightgreen);
  background: var(--bs-white) url("/images/grids.jpg") center/cover repeat;

  @media ${media.sm} {
    padding: 4rem 1rem;
  }

  @media ${media.md} {
    padding: 5rem 1rem;
  }

  @media ${media.lg} {
    padding: 6rem 1rem;
  }
`;

const Line = styled.div`
  width: 33.3333%;
  height: 3px;
  background: var(--bs-lightgreen);
  margin: 3rem auto 0;

  @media ${media.md} {
    margin: 4rem auto 0;
  }
`;

export default Intro;
