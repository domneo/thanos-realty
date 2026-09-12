import { useState } from "react";
import { removeWidows as stringRemoveWidows } from "string-remove-widows";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

import { Modal } from "./ConnectWithUs/Modal";

interface HeaderProps {
  contents: {
    title: string;
    subtitle: string;
    button: {
      text: string;
    };
  };
}

export const Header = ({ contents }: HeaderProps) => {
  const { title, subtitle, button } = contents;

  const [showModal, setShowModal] = useState(false);

  return (
    <Root className="container-fluid">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <h1 className="alt mb-4">{removeWidows(title)}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Subtitle className="sans-serif mb-0">
              {removeWidows(subtitle)}
            </Subtitle>
            <Line />
          </div>
          <div className="col-md-auto">
            <button
              className="btn btn-secondary btn-lg mt-4 mt-sm-5 mt-md-0"
              onClick={() => setShowModal(true)}
            >
              {
                stringRemoveWidows(button.text, {
                  convertEntities: false,
                  minWordCount: 3,
                }).res
              }
            </button>
            <Modal showModal={showModal} setShowModal={setShowModal} />
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

const Subtitle = styled.h5`
  color: var(--bs-gray-1000);
`;

const Line = styled.div`
  width: 90px;
  height: 1px;
  margin-top: 2rem;
  background: var(--bs-primary);

  @media ${media.sm} {
    width: 180px;
    margin-top: 3rem;
  }
`;
