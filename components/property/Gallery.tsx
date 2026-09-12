import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

import media from "styles/media";

import { GalleryModal } from "./GalleryModal";

import { PropertyAsset } from "types/content";

interface GalleryProps {
  images: PropertyAsset[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(0);

  const assets = images.sort((a, b) => {
    const a_is_main = a.is_main ?? 0;
    const b_is_main = b.is_main ?? 0;
    if (a_is_main < b_is_main) return 1;
    if (a_is_main > b_is_main) return -1;
    return 0;
  });
  const mainAsset = assets[0];
  const secondaryAssets = assets.slice(1);

  const renderAsset = (url: string, priority = false) => {
    const extension = url?.split(".")?.pop()?.toLowerCase();
    if (extension === "mp4") {
      return (
        <>
          <div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center">
            <Image
              src="/images/icon-play.svg"
              alt="Play Video"
              width={56}
              height={56}
            />
          </div>
          <Video controlsList="nodownload" width={"100%"}>
            <source src={url} type="video/mp4" />
            Sorry, your browser doesn&apos;t support embedded videos.
          </Video>
        </>
      );
    } else {
      return (
        <Image
          src={url}
          alt="property image"
          layout="fill"
          objectFit="cover"
          objectPosition={"center"}
          priority={priority}
        />
      );
    }
  };

  return (
    <Root className="container-fluid overflow-hidden">
      <div className="container">
        <div className="row">
          {assets && assets.length > 0 && (
            <div className="col">
              <Assets className={`assets-${assets.length}`}>
                <MainAsset className={`assets-${assets.length}`}>
                  <AssetBtn
                    onClick={() => {
                      setSelectedSlide(0);
                      setShowModal(true);
                    }}
                  >
                    {renderAsset(mainAsset.url, true)}
                  </AssetBtn>
                </MainAsset>
                {secondaryAssets[0] && (
                  <SecAsset1 className={`assets-${assets.length}`}>
                    <AssetBtn
                      onClick={() => {
                        setSelectedSlide(1);
                        setShowModal(true);
                      }}
                    >
                      {renderAsset(secondaryAssets[0].url)}
                    </AssetBtn>
                  </SecAsset1>
                )}
                {secondaryAssets[1] && (
                  <SecAsset2 className={`assets-${assets.length}`}>
                    <AssetBtn
                      onClick={() => {
                        setSelectedSlide(2);
                        setShowModal(true);
                      }}
                    >
                      {renderAsset(secondaryAssets[1].url)}
                    </AssetBtn>
                  </SecAsset2>
                )}
                {secondaryAssets[2] && (
                  <SecAsset3 className={`assets-${assets.length}`}>
                    <AssetBtn
                      onClick={() => {
                        setSelectedSlide(3);
                        setShowModal(true);
                      }}
                    >
                      {renderAsset(secondaryAssets[2].url)}
                    </AssetBtn>
                  </SecAsset3>
                )}
              </Assets>
              {assets && assets.length > 4 && (
                <div className="position-relative d-flex justify-content-end pt-2 pt-md-0">
                  <ViewMoreBtn
                    className="btn btn-secondary btn-white p-md-3"
                    onClick={() => {
                      setSelectedSlide(4);
                      setShowModal(true);
                    }}
                  >
                    View More
                  </ViewMoreBtn>
                </div>
              )}
              <GalleryModal
                assets={assets}
                showModal={showModal}
                setShowModal={setShowModal}
                selectedSlide={selectedSlide}
              />
            </div>
          )}
        </div>
      </div>
    </Root>
  );
};

const Root = styled.div`
  padding-top: 5rem;
  padding-bottom: 0.25rem;

  @media ${media.sm} {
    padding-top: 6rem;
  }

  @media ${media.lg} {
    padding-top: 7rem;
  }

  @media ${media.xl} {
    padding-top: 10rem;
  }
`;

const Assets = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto min-content;
  gap: 1rem;
  grid-template-areas:
    "main main main"
    "sec1 sec2 sec3";

  &.assets-1 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    gap: 0;
    grid-template-areas: "main";
  }

  &.assets-2 {
    grid-template-columns: 1fr;
    grid-template-rows: auto min-content;
    gap: 1rem;
    grid-template-areas:
      "main"
      "sec1";
  }

  &.assets-3 {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto min-content;
    gap: 1rem;
    grid-template-areas:
      "main main"
      "sec1 sec2";
  }

  @media ${media.lg} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1.25rem;
    grid-template-areas:
      "main main sec1"
      "main main sec2"
      "main main sec3";

    &.assets-1 {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      gap: 0;
      grid-template-areas: "main";
    }

    &.assets-2 {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr;
      gap: 1.25rem;
      grid-template-areas: "main main sec1";
    }

    &.assets-3 {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 1.25rem;
      grid-template-areas:
        "main main sec1"
        "main main sec2";
    }
  }
`;

const MainAsset = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  grid-area: main;
  aspect-ratio: 1.7777;

  @media ${media.md} {
    aspect-ratio: 2;
  }

  @media ${media.lg} {
    aspect-ratio: auto;

    &.assets-1 {
      aspect-ratio: 2.5;
    }
  }
`;

const SecondaryAsset = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  aspect-ratio: 1.5;

  &.assets-2 {
    aspect-ratio: 2.5;
  }

  @media ${media.sm} {
    aspect-ratio: 1.7777;
  }

  @media ${media.lg} {
    aspect-ratio: 2.4;

    &.assets-2 {
      aspect-ratio: 0.75;
    }

    &.assets-3 {
      aspect-ratio: 1.5;
    }
  }
`;

const SecAsset1 = styled(SecondaryAsset)`
  grid-area: sec1;
`;

const SecAsset2 = styled(SecondaryAsset)`
  grid-area: sec2;
`;

const SecAsset3 = styled(SecondaryAsset)`
  grid-area: sec3;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AssetBtn = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: 0.3s opacity;

  &:hover {
    opacity: 0.9;
    transition: 0.3s opacity;
  }

  &:focus {
    box-shadow: 0 0 0 0.25rem rgba(5, 70, 80, 0.3);
  }
`;

const ViewMoreBtn = styled.button`
  @media ${media.md} {
    position: absolute;
    bottom: 0.75rem;
    right: 0.75rem;
  }
`;
