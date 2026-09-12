import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

interface IntroProps {
  contents: {
    title: string;
    subtitle: string;
  };
}

export const Intro = ({ contents }: IntroProps) => {
  const { title, subtitle } = contents;

  return (
    <Root className="container-fluid position-relative">
      <BgCircle1>
        <Circle />
      </BgCircle1>
      <BgCircle2>
        <Circle />
      </BgCircle2>
      <div className="container">
        <div className="row">
          <div className="col px-sm-4 px-lg-5">
            <h1 className="alt mb-4 mb-md-5">{title}</h1>
            <h3 className="alt text-black">{removeWidows(subtitle)}</h3>
          </div>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.div`
  padding-top: 8rem;
  padding-bottom: 2rem;

  @media ${media.md} {
    padding-top: 10rem;
    padding-bottom: 3rem;
  }

  @media ${media.lg} {
    padding-top: 12rem;
  }

  @media ${media.xl} {
    padding-top: 13rem;
  }
`;

const BgCircle = styled.div`
  position: absolute;
  bottom: 0;
  width: 2rem;
  overflow: hidden;

  @media ${media.md} {
    width: 3rem;
  }
`;

const BgCircle1 = styled(BgCircle)`
  left: -100%;
  transform: rotate(180deg);

  @media ${media.sm} {
    left: 0;
  }
`;

const BgCircle2 = styled(BgCircle)`
  right: 0;
  transform: translateY(-40%);
`;

const Circle = styled.div`
  display: block;
  width: 270px;
  height: 270px;
  border-radius: 100%;
  background: var(--bs-lightgreen);
`;
