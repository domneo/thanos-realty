import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

interface HeaderProps {
  contents: {
    title: string;
  };
}

export const Header = ({ contents }: HeaderProps) => {
  const { title } = contents;

  return (
    <Root className="container-fluid">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-12">
            <BorderBox>
              <h1 className="alt mb-4 mb-xl-5">{removeWidows(title)}</h1>
            </BorderBox>
          </div>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.div`
  padding-top: 6rem;

  @media ${media.md} {
    padding-top: 8rem;
  }

  @media ${media.lg} {
    padding-top: 10rem;
  }

  @media ${media.xl} {
    padding-top: 11rem;
  }
`;

const BorderBox = styled.div`
  border-bottom: 1px solid var(--bs-gray-400);
`;
