import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import styled from "styled-components";

import media from "styles/media";

import { Filter, FilterProps } from "./Filter";
import { Pagination } from "./Property/Pagination";
import Property from "./Property/Property";

import { PropertiesData } from "types/content";

interface ListingsProps {
  contents: {
    filters: FilterProps[];
    properties: PropertiesData;
  };
}

export const Listings = ({ contents }: ListingsProps) => {
  const { filters, properties } = contents;

  // Filters
  const [precinctSelected, setPrecinctSelected] = useState("all");
  const [idealRentSelected, setIdealRentSelected] = useState("all");

  // Property listings
  const [propertyListings, setPropertyListings] =
    useState<PropertiesData>(properties);
  const getProperties = async (page?: number) => {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }api/v1/properties?published=1&sort=published_at&sort_by=desc&per_page=8&page=${
        page || 1
      }&precinct=${
        precinctSelected === "all" ? "" : precinctSelected
      }&ideal_rent=${idealRentSelected === "all" ? "" : idealRentSelected}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    );
    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error("Failed to fetch API");
    }
    setPropertyListings(json.data?.properties);
  };
  // Load 1st page of properties on load
  useEffect(() => {
    getProperties(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On filter change, get articles for selected category
  useEffect(() => {
    getProperties(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [precinctSelected, idealRentSelected]);

  return (
    <Element name="propertyListings" className="container-fluid py-5 py-sm-6">
      <div className="container-lg">
        <div className="row row-cols-1 row-cols-sm-2 mb-5">
          <div className="col">
            <Filter
              label={filters[0].label}
              options={filters[0].options}
              selected={precinctSelected}
              onSelectChange={setPrecinctSelected}
            />
          </div>
          <div className="col">
            <Filter
              label={filters[1].label}
              options={filters[1].options}
              selected={idealRentSelected}
              onSelectChange={setIdealRentSelected}
            />
          </div>
        </div>
        <Results>
          Showing{" "}
          <span className="fw-bold">
            {propertyListings?.from || 1}-{propertyListings?.to || 1}
          </span>{" "}
          of <span className="fw-bold">{propertyListings?.total || 0}</span>{" "}
          results
        </Results>
        <div className="row row-cols-1 row-cols-md-2 justify-content-center justify-content-md-start">
          {propertyListings?.data?.map((property, i) => {
            if (property) {
              const {
                id,
                slug,
                title,
                images,
                precinct,
                typical_floor_plate,
                ideal_rent_price,
              } = property;

              const image = images?.filter((img) => img.is_main === 1)[0];

              return (
                <div key={id} className="col col-sm-10 mb-5">
                  <Property
                    index={i}
                    id={id}
                    slug={slug}
                    title={title}
                    image={image ? image?.url : (images && images.length > 0 ? images?.[0].url : undefined)}
                    precinct={precinct}
                    typical_floor_plate={typical_floor_plate}
                    ideal_rent_price={ideal_rent_price}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="row mt-md-5">
          <div className="order-md-2 col-md-3 d-flex align-items-center justify-content-end text-end">
            <Results>
              Showing{" "}
              <span className="fw-bold">
                {propertyListings?.from || 1}-{propertyListings?.to || 1}
              </span>{" "}
              of <span className="fw-bold">{propertyListings?.total || 0}</span>{" "}
              results
            </Results>
          </div>
          <div className="col-md-6 offset-md-3 d-flex justify-content-center pt-3">
            <Pagination
              current_page={propertyListings?.current_page}
              last_page={propertyListings?.last_page}
              scrollTarget={"propertyListings"}
              getProperties={getProperties}
            />
          </div>
        </div>
      </div>
    </Element>
  );
};

const Results = styled.p`
  color: var(--bs-gray-700);
  margin: 0 0 2.5rem;
  font-size: 1rem;

  @media ${media.md} {
    font-size: 1.25rem;
  }
`;
