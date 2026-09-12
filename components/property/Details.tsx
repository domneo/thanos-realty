import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

interface DetailsProps {
  title?: string;
  precinct?: string;
  mrt?: string;
  typical_floor_plate?: string;
  year_built?: number;
  building_size?: number;
  stories?: number;
  ideal_rent_price?: number;
  ideal_rent_text?: string;
}

export const Details = ({
  title,
  precinct,
  mrt,
  typical_floor_plate,
  year_built,
  building_size,
  stories,
  ideal_rent_price,
  ideal_rent_text,
}: DetailsProps) => {
  const parsedTypicalFloorPlate = `${typical_floor_plate || ""} sq ft`;
  const parsedBuildingSize = `${building_size?.toLocaleString("en-US")} sq ft`;

  const detailList = [
    { label: "Precinct", value: precinct },
    { label: "Nearest MRT", value: mrt },
    {
      label: "Typical Floor Plate (Sub-divisable)",
      value: parsedTypicalFloorPlate,
    },
    { label: "Year Built", value: year_built },
    { label: "Building Size", value: parsedBuildingSize },
    { label: "No. of Storeys", value: stories },
  ];

  return (
    <section className="container-fluid">
      <Content className="container py-4 py-md-5 py-lg-6">
        <div className="row align-items-stretch">
          <div className="col-lg-8">
            <h1 className="h2 alt text-dark mb-5 mb-lg-0">{title}</h1>
          </div>
          {ideal_rent_price && (
            <IdealRentColumn className="col-lg-4 d-flex flex-column justify-content-end pt-4 pt-lg-0 ps-lg-5">
              <p className="subheading sm text-black mb-3">Asking Rent</p>
              <p className="h5 sans-serif fw-bold text-black mb-2">
                SGD ${ideal_rent_price} <small>psf/month</small>
              </p>
              {ideal_rent_text && (
                <p className="text-black mb-0">
                  {removeWidows(ideal_rent_text)}
                </p>
              )}
            </IdealRentColumn>
          )}
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mt-lg-5">
          {detailList.map((detail) => {
            return (
              <div key={detail.label} className="col mt-5">
                <p className="subheading sm text-gray mb-2">{detail.label}</p>
                <DetailValue className="xl fw-bold mb-0">
                  {removeWidows(detail.value)}
                </DetailValue>
              </div>
            );
          })}
        </div>
      </Content>
    </section>
  );
};

const Content = styled.div`
  border-bottom: 1px solid var(--bs-gray-500);
`;

const IdealRentColumn = styled.div`
  border-top: 1px solid var(--bs-gray-500);

  @media ${media.lg} {
    border-top: none;
    border-left: 1px solid var(--bs-gray-500);
  }
`;

const DetailValue = styled.p`
  color: var(--bs-lightgreen);
`;
