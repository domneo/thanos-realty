import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReactModal from "react-modal";
import reactStringReplace from "react-string-replace";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

import CrossIcon from "components/icons/CrossIcon";

ReactModal.setAppElement("#__next");

interface MemberProps {
  data: {
    image?: string;
    video?: string;
    first_name?: string;
    last_name?: string;
    position?: string;
    email?: string;
    phone?: string;
    mobile?: string;
  };
}

export const Member = ({ data }: MemberProps) => {
  const {
    image,
    video,
    first_name,
    last_name,
    position,
    email,
    phone,
    mobile,
  } = data;

  const [showModal, setShowModal] = useState(false);

  const getEmailElement = (email: string) => {
    const username = email.split("@")[0];
    const domain = email.split("@")[1];
    return (
      <span className="d-inline-flex flex-wrap">
        <span>{username}</span>
        <span>@{domain}</span>
      </span>
    );
  };

  return (
    <Root>
      <ImageWrapper title={`${first_name} ${last_name}`}>
        {/* TODO: placeholder image */}
        <Image
          src={image || ""}
          alt={`${first_name} ${last_name}`}
          layout="fill"
          objectFit="cover"
          objectPosition={"center"}
        />
      </ImageWrapper>
      {video && (
        <>
          <VideoButton onClick={() => setShowModal(true)}>
            <Image
              src="/images/icon-play.svg"
              alt="Play Video"
              width={56}
              height={56}
            />
          </VideoButton>
          <ReactModal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            overlayClassName={"member-modal-overlay"}
            className="member-modal-content"
            contentLabel={`${first_name} ${last_name} video`}
            shouldFocusAfterRender={true}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            shouldReturnFocusAfterClose={true}
          >
            <style jsx global>
              {`
                .member-modal-overlay {
                  position: fixed;
                  inset: 0;
                  overflow: auto;
                  padding: 1rem;
                  background-color: rgba(35, 35, 35, 0.8);
                  z-index: 5000;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .member-modal-content {
                  max-width: 1120px;
                  margin: 0 auto;
                  background: var(--bs-white);
                  border-radius: 0.5rem;
                  padding: 0.5rem;
                }
              `}
            </style>
            <video controls controlsList="nodownload" width={"100%"}>
              <source src={video} type="video/mp4" />
              Sorry, your browser doesn&apos;t support embedded videos.
            </video>
            <div className="d-flex justify-content-end">
              <CloseButton onClick={() => setShowModal(false)}>
                <CrossIcon />
              </CloseButton>
            </div>
          </ReactModal>
        </>
      )}
      <MemberDetails>
        <h5 className="mb-1">{removeWidows(`${first_name} ${last_name}`)}</h5>
        <p className="subheading sm text-black mb-4">
          {removeWidows(position)}
        </p>
        {email && (
          <div className="d-flex align-items-center mb-2">
            <div className="d-flex align-items-center flex-shrink-0 me-3 me-sm-4">
              <Image
                src={`/images/icon-mail.svg`}
                alt="icon"
                width={24}
                height={24}
              />
            </div>
            <Link href={`mailto:${email}`}>
              <a>
                <p className="mb-0" style={{ lineHeight: 1.5 }}>
                  Email
                </p>
              </a>
            </Link>
          </div>
        )}
        {mobile && (
          <div className="d-flex align-items-center flex-wrap mb-2">
            <div className="d-flex align-items-center flex-shrink-0 me-3 me-sm-4">
              <Image
                src={`/images/icon-whatsapp.png`}
                alt="icon"
                width={24}
                height={24}
              />
            </div>
            <Link href={`https://wa.me/${mobile.replace(/\s|\(|\)|\-|\+/gi, "")}`}>
              <a>
                <p className="mb-0">{removeWidows(`WhatsApp`)}</p>
              </a>
            </Link>
          </div>
        )}
      </MemberDetails>
    </Root>
  );
};

const Root = styled.div`
  border: 1px solid var(--bs-gray-300);
  height: 100%;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 1.333;
  z-index: 1;
`;

const VideoButton = styled.button`
  position: absolute;
  top: 0;
  display: block;
  width: 100%;
  aspect-ratio: 1.7777;
  z-index: 10;
  background: transparent;
  border: none;
  opacity: 0.7;

  @media ${media.md} {
    aspect-ratio: 1.4;
  }

  &:hover,
  &:focus {
    opacity: 1;
    transition: 0.3s opacity;
  }
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

const MemberDetails = styled.div`
  padding: 1.25rem 1.5rem;

  @media ${media.sm} {
    padding: 1.5rem 1.75rem;
  }

  @media ${media.md} {
    padding: 1.5rem 2rem;
  }

  @media ${media.xl} {
    padding: 2rem 2.5rem;
  }
`;
