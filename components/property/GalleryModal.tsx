import Image from "next/image";
import { useRef } from "react";
import ReactModal from "react-modal";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

import CrossIcon from "components/icons/CrossIcon";

import { PropertyAsset } from "types/content";

interface GalleryModalProps {
  assets: PropertyAsset[];
  showModal: boolean;
  setShowModal: (arg: boolean) => void;
  selectedSlide: number;
}

export const GalleryModal = ({
  assets,
  showModal,
  setShowModal,
  selectedSlide,
}: GalleryModalProps) => {
  const slider = useRef<Slider>(null);

  const settings: Settings = {
    autoplay: false,
    arrows: true,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    // Unfixed bug when using `infinite:false` with `initialSlide`
    // -- Hitting "next" will jump to the second slide instead of next in sequence
    // infinite: false,
    initialSlide: selectedSlide,
  };

  const renderAsset = (key: string, url: string) => {
    const extension = url?.split(".")?.pop()?.toLowerCase();
    if (extension === "mp4") {
      return (
        <Video key={key} controls controlsList="nodownload">
          <source src={url} type="video/mp4" />
          Sorry, your browser doesn&apos;t support embedded videos.
        </Video>
      );
    } else {
      return (
        <ImageWrapper key={key}>
          <Image
            src={url}
            alt="property image"
            layout="fill"
            objectFit="contain"
            objectPosition={"center"}
          />
        </ImageWrapper>
      );
    }
  };

  return (
    <ReactModal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      overlayClassName={"property-modal-overlay"}
      className="property-modal-content"
      contentLabel={`property images`}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldReturnFocusAfterClose={true}
    >
      <style jsx global>
        {`
          .property-modal-overlay {
            position: fixed;
            inset: 0;
            overflow: hidden;
            background-color: rgba(35, 35, 35, 0.8);
            z-index: 5000;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .property-modal-content {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }
          .property-modal-content .slick-slider,
          .property-modal-content .slick-list {
            width: 100%;
            height: 100%;
          }
          .property-modal-content .slick-track {
            height: 100%;
          }
          .property-modal-content .slick-slide > div {
            width: 100%;
            height: 100%;
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .property-modal-content .slick-prev,
          .property-modal-content .slick-next {
            z-index: 1;
            width: 2.5rem;
            height: 2.5rem;
          }
          .property-modal-content .slick-prev::before,
          .property-modal-content .slick-next::before {
            font-size: 2.5rem;
            filter: drop-shadow(0 0 8px rgb(0 0 0 / 0.6));
            transition: 0.3s opacity;
            opacity: 1;
          }
          .property-modal-content .slick-prev:hover::before,
          .property-modal-content .slick-prev:focus::before,
          .property-modal-content .slick-next:hover::before,
          .property-modal-content .slick-next:focus::before {
            opacity: 0.75;
          }
          .property-modal-content .slick-prev {
            left: 1.5rem;
          }
          .property-modal-content .slick-next {
            right: 1.5rem;
          }
        `}
      </style>
      <Slider ref={slider} {...settings}>
        {assets.map((asset) => renderAsset(asset.id, asset.url))}
      </Slider>
      <CloseButton onClick={() => setShowModal(false)}>
        <CrossIcon />
      </CloseButton>
    </ReactModal>
  );
};

const ImageWrapper = styled.div`
  position: relative;
  height: 100%;
  max-height: 100%;
`;

const Video = styled.video`
  object-position: center;
  max-width: 100%;
  max-height: 100%;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  color: var(--bs-white);
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

  svg {
    filter: drop-shadow(0 0 8px rgb(0 0 0 / 0.6));
  }
`;
