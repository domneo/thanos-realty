import Image from "next/image";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

import CrossIcon from "components/icons/CrossIcon";
import PaginationChevronLeftIcon from "components/icons/PaginationChevronLeftIcon";

import { ConnectWithUsForm } from "./Form";

ReactModal.setAppElement("#__next");

interface ConnectWithUsModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export const ConnectWithUsModal = ({
  showModal,
  setShowModal,
}: ConnectWithUsModalProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Reset form each time the modal is re-opened
  useEffect(() => {
    setShowSuccess(false);
    setShowError(false);
  }, [showModal]);

  return (
    <ReactModal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      overlayClassName={"connectwithus-modal-overlay"}
      className="connectwithus-modal-content"
      contentLabel={"Connect With Us Modal"}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldReturnFocusAfterClose={true}
    >
      <style jsx global>
        {`
          .connectwithus-modal-overlay {
            position: fixed;
            inset: 0;
            overflow: auto;
            padding: 3rem 1rem;
            background-color: rgba(35, 35, 35, 0.5);
            z-index: 5000;
          }
          @media (min-width: 992px) {
            .connectwithus-modal-overlay {
              padding: 3rem 1rem 6rem;
            }
          }
          .connectwithus-modal-content {
            max-width: 1120px;
            margin: 0 auto;
            background: var(--bs-white);
            border-radius: 1rem;
            padding: 1rem;
          }
          @media ${media.sm} {
            .connectwithus-modal-content {
              padding: 1.5rem;
            }
          }
          @media ${media.md} {
            .connectwithus-modal-content {
              border-radius: 1.5rem;
              padding: 2rem;
            }
          }
          @media ${media.lg} {
            .connectwithus-modal-content {
              padding: 2.5rem;
            }
          }
          @media ${media.xl} {
            .connectwithus-modal-content {
              padding: 3rem;
            }
          }
        `}
      </style>
      <Root className="container-fluid overflow-hidden px-0">
        <div className="position-absolute top-0 bottom-0 start-0 end-0 overflow-hidden">
          <ImageWrapper>
            <Image
              src="/images/connectwithus-circles.svg"
              alt="circles"
              layout="fill"
              objectFit="contain"
              objectPosition={"25% top"}
            />
          </ImageWrapper>
        </div>
        <div className="d-flex justify-content-center">
          <div className="flex-grow-1">
            <Logo>
              <Image
                src={"/images/logo-rgb.svg"}
                alt="Thanos Realty | Halving Occupancy, Doubling Space"
                layout="fill"
                objectFit="contain"
                objectPosition={"left center"}
              />
            </Logo>
          </div>
          <div
            className="d-flex align-items-center ps-3 pe-2"
            style={{ zIndex: "1" }}
          >
            <CloseButton onClick={() => setShowModal(false)}>
              <CrossIcon />
            </CloseButton>
          </div>
        </div>
        <Main className="row justify-content-center">
          <div className="col-10" style={{ zIndex: "1" }}>
            {!showSuccess && !showError && (
              <>
                <h2 className="h1 alt text-center mb-4">
                  Connect with&nbsp;us
                </h2>
                <h5 className="sans-serif text-center text-black">
                  {removeWidows(
                    "Let us know your space and workplace requirements, and we will be in touch."
                  )}
                </h5>
                <ConnectWithUsForm
                  showSuccess={() => setShowSuccess(true)}
                  showError={() => setShowError(true)}
                />
              </>
            )}
            {showSuccess && (
              <div className="text-center py-5">
                <h4 className="alt">
                  {removeWidows("Thank you for your submission.")}
                </h4>
                <p className="lg">
                  {removeWidows(
                    "Our team will get back to you in one working day."
                  )}
                </p>
              </div>
            )}
            {showError && (
              <div className="text-center py-5">
                <h5 className="alt text-danger">
                  {removeWidows(
                    "Sorry, an error occurred while trying to submit the form."
                  )}
                </h5>
                <p className="lg">
                  {removeWidows(
                    "Please try submitting the form again. If the issue persists, please contact us at "
                  )}
                  <a href="mailto:enquiry@thanos-realty.com">
                    enquiry@thanos-realty.com
                  </a>
                  .
                </p>
                <button
                  onClick={() => setShowError(false)}
                  className="btn btn-primary btn-darkgreen mt-4"
                >
                  <BackIcon>
                    <PaginationChevronLeftIcon />
                  </BackIcon>
                  Back to form
                </button>
              </div>
            )}
          </div>
        </Main>
      </Root>
    </ReactModal>
  );
};

const Root = styled.div``;

const ImageWrapper = styled.div`
  pointer-events: none;
  position: relative;
  width: 200%;
  height: 100%;
  margin-top: 7%;

  @media (min-width: 400px) {
    width: 200%;
    margin-top: 0;
  }

  @media ${media.sm} {
    width: 150%;
    margin-top: 0;
  }

  @media ${media.md} {
    width: 100%;
    margin-top: 7%;
  }
`;

const Logo = styled.div`
  width: 100%;
  height: 48px;
  position: relative;
`;

const CloseButton = styled.button`
  color: var(--bs-black);
  background: transparent;
  border: none;
  padding: 0.5rem;
  margin: 0;
  width: 2.5rem;
  opacity: 1;

  &:hover,
  &:focus {
    opacity: 0.6;
    transition: 0.3s opacity;
  }
`;

const Main = styled.div`
  margin-top: 80px;

  @media (min-width: 400px) {
    margin-top: 100px;
  }

  @media ${media.sm} {
    margin-top: 100px;
  }

  @media ${media.md} {
    margin-top: 140px;
  }

  @media ${media.lg} {
    margin-top: 200px;
  }
`;

const BackIcon = styled.span`
  width: 1.75rem;
  height: 1.75rem;
  display: inline-block;
`;
