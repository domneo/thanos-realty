import { removeWidows as stringRemoveWidows } from "string-remove-widows";
import styled from "styled-components";

import media from "styles/media";

interface Service {
  label?: string;
  value?: string;
}

interface PropertyInfoProps {
  precinct?: string;
  size?: string;
  services?: string;
}

export const PropertyInfo = ({
  precinct,
  size,
  services,
}: PropertyInfoProps) => {
  const servicesArr: Service[] = services && JSON.parse(services);

  return (
    <section className="container-fluid overflow-hidden px-3">
      <div className="row justify-content-center">
        <div className="col">
          <Content className="px-sm-4 pb-5 pb-md-6 mb-5">
            <div className="row">
              {size && (
                <div className={`mt-5 ${precinct ? "col-md-5 pe-md-5" : ""}`}>
                  <Label className="subheading mb-0">Size</Label>
                  <Info className="mb-0 mt-1">
                    {
                      stringRemoveWidows(size, {
                        convertEntities: false,
                        minWordCount: 3,
                      }).res
                    }
                  </Info>
                </div>
              )}
              {precinct && (
                <Precinct className={`mt-5 ${size ? "col-md-7 ps-md-5" : ""}`}>
                  <Label className="subheading mb-0">Precinct</Label>
                  <Info className="mb-0 mt-1">
                    {
                      stringRemoveWidows(precinct, {
                        convertEntities: false,
                        minWordCount: 3,
                      }).res
                    }
                  </Info>
                </Precinct>
              )}
            </div>
            {services && services.length > 0 && (
              <div className="row">
                <div className="col mt-5">
                  <Label className="subheading mb-0">Services</Label>
                  <Info className="mb-0 mt-1">
                    {servicesArr.map((service, i) => {
                      return (
                        <span key={service.value}>
                          <span className="d-inline-block">
                            {service.label}
                          </span>
                          {i + 1 < servicesArr.length && <span> • </span>}
                        </span>
                      );
                    })}
                  </Info>
                </div>
              </div>
            )}
          </Content>
        </div>
      </div>
    </section>
  );
};

const Content = styled.div`
  border-bottom: 1px solid var(--bs-gray-500);
  max-width: 1000px;
  margin: 0 auto;
`;

const Label = styled.p`
  color: var(--bs-gray-700);
`;

const Info = styled.h4`
  color: var(--bs-dark);

  @media ${media.lg} {
    font-size: 2.5rem;
  }
`;

const Precinct = styled.div`
  @media ${media.md} {
    border-left: 1px solid var(--bs-gray-500);
  }
`;
