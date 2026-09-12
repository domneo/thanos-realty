import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";
import { addProperty, removeProperty } from "utils/cartAPI";

import { SavedListingsContext } from "components/SavedListingsContext";

import { HeartIcon } from "./HeartIcon";

interface PropertyProps {
  index?: number;
  id?: string;
  slug?: string;
  title?: string;
  image?: string;
  precinct?: string;
  typical_floor_plate?: string;
  ideal_rent_price?: number;
}

const Property = ({
  index,
  id,
  slug,
  title,
  image,
  precinct,
  typical_floor_plate,
  ideal_rent_price,
}: PropertyProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const savedListings = useContext(SavedListingsContext);

  const saveBtnOnClick = () => {
    const payload = {
      session_id: localStorage.getItem("session_id") || "",
      property_id: id,
    };
    if (isSaved) {
      removeProperty(payload).then((res) => {
        if (res.status === "success") {
          setIsSaved(false);
          savedListings.update();
        }
      });
    } else {
      addProperty(payload).then((res) => {
        if (res.status === "success") {
          setIsSaved(true);
          savedListings.update();
        }
      });
    }
  };

  // Check if property is already in saved listings
  useEffect(() => {
    setIsSaved(
      savedListings.saved.filter(
        (savedListing) => savedListing.property_id === id
      ).length > 0
    );
  }, [savedListings, id]);

  return (
    <Root className="d-flex flex-column h-100">
      <Link href={`/properties/${slug}`} passHref>
        <ImageWrapper title={title}>
          {/* TODO: placeholder image */}
          <Image
            src={image || "https://via.placeholder.com/1440x900"}
            alt={title}
            layout="fill"
            objectFit="cover"
            objectPosition={"center"}
            priority={index === 0}
          />
        </ImageWrapper>
      </Link>
      <PropertyDetails className="h-100 d-flex flex-column flex-lg-row">
        <div className="flex-grow-1 d-flex flex-column justify-content-between">
          <div>
            <Link href={`/properties/${slug}`} passHref>
              <TitleLink title={title}>
                <h5 className="mb-2">{title}</h5>
              </TitleLink>
            </Link>
            <p className="text-black">
              {precinct && (
                <span className="d-inline-block">{removeWidows(precinct)}</span>
              )}
              {typical_floor_plate && (
                <>
                  <span className="mx-2">|</span>
                  <span className="d-inline-block">
                    {typical_floor_plate} sq ft
                  </span>
                </>
              )}
            </p>
          </div>
          {ideal_rent_price && (
            <p className="h5 sans-serif fw-bold text-black mb-2">
              SGD ${ideal_rent_price} <small>psf/month</small>
            </p>
          )}
        </div>
        <div className="d-flex justify-content-end ms-lg-3">
          {id && (
            <SaveButton onClick={() => saveBtnOnClick()}>
              <HeartIcon isSaved={isSaved} />
            </SaveButton>
          )}
        </div>
      </PropertyDetails>
    </Root>
  );
};

const Root = styled.article`
  border: 1px solid var(--bs-gray-200);
`;

const ImageWrapper = styled.a`
  position: relative;
  display: block;
  width: 100%;
  min-height: 150px;
  aspect-ratio: 1.7777;
  flex-shrink: 0;

  @media ${media.sm} {
    min-height: 240px;
  }

  @media ${media.md} {
    min-height: 180px;
  }

  @media ${media.lg} {
    min-height: 240px;
  }

  @media ${media.xl} {
    min-height: 300px;
  }

  @media ${media.xxl} {
    min-height: 350px;
  }
`;

const PropertyDetails = styled.div`
  padding: 1.5rem;

  @media ${media.sm} {
    padding: 1.75rem;
  }

  @media ${media.md} {
    padding: 2rem;
  }

  @media ${media.xl} {
    padding: 2.5rem;
  }
`;

const TitleLink = styled.a`
  text-decoration: none;
  flex-grow: 1;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const SaveButton = styled.button`
  background: transparent;
  border: none;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
  align-self: flex-start;
`;

export default Property;
