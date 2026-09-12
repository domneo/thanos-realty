import Link from "next/link";
import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import styled from "styled-components";

import media from "styles/media";
import { getSavedProperties } from "utils/cartAPI";

import Property from "components/properties/Property/Property";

import { HeartEmptyIcon } from "./HeartEmptyIcon";

import { PropertyData } from "types/content";

interface SavedListingData {
  cart_id: string;
  created_at: string;
  id: string;
  property: PropertyData;
  property_id: string;
  updated_at: string;
}

interface ListingsProps {
  contents: {
    noListings: {
      title: string;
      button: {
        text: string;
        link: string;
      };
    };
  };
}

export const Listings = ({ contents }: ListingsProps) => {
  const { noListings } = contents;

  // Property listings
  const [savedListings, setSavedListings] = useState<SavedListingData[]>();
  // Load 1st page of properties on load
  useEffect(() => {
    getSavedProperties({
      session_id: localStorage.getItem("session_id") || "",
    }).then((res) => setSavedListings(res.data?.properties.data || []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Element name="propertyListings" className="container-fluid py-5 py-sm-6">
      <div className="container-lg">
        {savedListings && savedListings.length > 0 && (
          <div className="row row-cols-1 row-cols-md-2 justify-content-center justify-content-md-start">
            {savedListings?.map((savedListing, i) => {
              if (savedListing?.property) {
                const {
                  id,
                  slug,
                  title,
                  images,
                  precinct,
                  typical_floor_plate,
                  ideal_rent_price,
                } = savedListing?.property;

                const image = images?.filter((img) => img.is_main === 1)[0];

                return (
                  <div key={id} className="col col-sm-10 mb-5">
                    <Property
                      index={i}
                      id={id}
                      slug={slug}
                      title={title}
                      image={image ? image?.url : images?.[0].url}
                      precinct={precinct}
                      typical_floor_plate={typical_floor_plate}
                      ideal_rent_price={ideal_rent_price}
                    />
                  </div>
                );
              }
            })}
          </div>
        )}
        {!savedListings ||
          (!(savedListings.length > 0) && (
            <div className="row">
              <div className="col text-center py-5">
                <NoListingsTitle className="d-flex align-items-center justify-content-center mb-4">
                  {noListings.title}{" "}
                  <HeartEmpty>
                    <HeartEmptyIcon />
                  </HeartEmpty>
                </NoListingsTitle>
                <Link href={noListings.button.link}>
                  <a className="btn btn-primary">{noListings.button.text}</a>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </Element>
  );
};

const NoListingsTitle = styled.h4`
  color: var(--bs-gray-600);
`;

const HeartEmpty = styled.span`
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  margin-left: 0.5rem;

  @media ${media.md} {
    width: 2.5rem;
    height: 2.5rem;
    margin-left: 0.75rem;
  }
`;
