import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

interface HeaderProps {
  contents: {
    title: string;
    subtitle: string;
  };
}

export const Header = ({ contents }: HeaderProps) => {
  const { title, subtitle } = contents;

  return (
    <Root className="container-fluid">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <h1 className="alt">{removeWidows(title)}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-10 ps-4">
            <BorderBox>
              <Subtitle className="sans-serif mb-0">
                {removeWidows(subtitle)}
              </Subtitle>
            </BorderBox>
          </div>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.div`
  padding-top: 8rem;

  @media ${media.md} {
    padding-top: 10rem;
  }

  @media ${media.lg} {
    padding-top: 12rem;
  }

  @media ${media.xl} {
    padding-top: 13rem;
  }
`;

const BorderBox = styled.div`
  border-left: 1px solid var(--bs-primary);
  padding: 1rem 0 1rem 2rem;

  @media ${media.lg} {
    padding: 1rem 0 1rem 3rem;
  }
`;

const Subtitle = styled.h5`
  color: var(--bs-gray-1000);
`;
