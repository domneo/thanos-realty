import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

interface TemplateProps {
  contents: {
    title: string;
  };
}

export const Template = ({ contents }: TemplateProps) => {
  const { title } = contents;

  return (
    <Root className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>{removeWidows(title)}</h1>
          </div>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.div`
  color: var(--bs-white);

  @media ${media.md} {
    color: var(--bs-black);
  }
`;
