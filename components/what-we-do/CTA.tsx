import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

import { ConnectWithUsModal } from "components/layout/Header/ConnectWithUs/Modal";

interface CTAProps {
  contents: {
    title: string;
    button: {
      text: string;
      link: string;
    };
  };
}

const CTA = ({ contents }: CTAProps) => {
  const { title, button } = contents;

  const [showModal, setShowModal] = useState(false);

  return (
    <section className="container-fluid position-relative">
      <BgImageWrapper className="position-absolute top-0 bottom-0 start-0 end-0">
        <div className="position-relative w-100 h-100">
          <Image
            src={`/images/wwd-cta-bg.jpg`}
            alt="modern workplace"
            layout="fill"
            objectFit="cover"
            objectPosition={"center"}
          />
        </div>
      </BgImageWrapper>
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-md-7 col-xl-6 col-xxl-5 px-3 py-4 p-sm-4 p-lg-5 p-xl-6">
            <Content className="position-relative overflow-hidden text-center text-sm-start">
              <div className="position-absolute top-0 start-0 end-0 d-flex align-items-start">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 435 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0H435V5.5L0 16V0Z" fill="#CB6344" />
                </svg>
              </div>
              <h3 className="mb-4 text-dark">{removeWidows(title)}</h3>
              <button
                className="btn btn-primary btn-darkgreen"
                onClick={() => setShowModal(true)}
              >
                {removeWidows(button.text)}
              </button>
              <ConnectWithUsModal
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </Content>
          </div>
        </div>
      </div>
    </section>
  );
};

const BgImageWrapper = styled.div`
  z-index: -1;
`;

const Content = styled.div`
  background: var(--bs-white);
  box-shadow: 0px 4px 48px 0px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  border-radius: 0.5rem 2rem;
  margin-top: 200px;

  @media ${media.sm} {
    padding: 2rem 3rem;
    border-radius: 0.5rem 3rem;
  }

  @media ${media.lg} {
    padding: 3.5rem 4rem;
    border-radius: 1rem 5rem;
    margin-top: 240px;
  }

  @media ${media.xxl} {
    margin-top: 280px;
  }
`;

export default CTA;
