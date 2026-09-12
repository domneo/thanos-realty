import { useEffect, useRef, useState } from "react";
import reactStringReplace from "react-string-replace";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

interface KeyServicesProps {
  contents: {
    keyServices: {
      name: string;
      title: string;
      description: string;
      offerings: string[];
    }[];
    offeringsTitle: string;
  };
}

const KeyServices = ({ contents }: KeyServicesProps) => {
  const { keyServices, offeringsTitle } = contents;

  const tabRow = useRef<HTMLDivElement>(null);

  // Determines which tab is selected
  const [activeTab, setActiveTab] = useState(0);

  // Determines whether to show the gradient scroll indicator
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  const tabRowScrollHandler = (target: HTMLDivElement) => {
    const { offsetWidth, scrollWidth, scrollLeft } = target as HTMLDivElement;
    setShowLeftScroll(scrollLeft !== 0);
    setShowRightScroll(scrollLeft + offsetWidth !== scrollWidth);
  };

  // Set display of scroll indicators on load
  useEffect(() => {
    if (tabRow.current) tabRowScrollHandler(tabRow.current);
  }, []);

  return (
    <section className="container-fluid overflow-hidden px-0">
      <div className="position-relative">
        <div
          ref={tabRow}
          onScroll={(e) => tabRowScrollHandler(e.target as HTMLDivElement)}
          className="d-flex flex-nowrap overflow-auto"
        >
          {keyServices.map((service, index) => {
            return (
              <Tab
                key={service.name}
                className={`text-center ${
                  activeTab === index ? "tab-active" : ""
                }`}
              >
                <TabButton
                  className={`h5 sans-serif ${
                    activeTab === index ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {reactStringReplace(service.name, "\n", (match, i) => (
                    <br key={i} />
                  ))}
                </TabButton>
              </Tab>
            );
          })}
        </div>
        <ScrollIndicator className={`left ${showLeftScroll ? "show" : ""}`} />
        <ScrollIndicator className={`right ${showRightScroll ? "show" : ""}`} />
      </div>
      <TabContent className="container-fluid py-5 py-md-6">
        {keyServices.map((service, index) => {
          return (
            <div
              key={service.name}
              className={`container ${activeTab === index ? "" : "d-none"}`}
            >
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <Title>{removeWidows(service.title)}</Title>
                  <p className="lg mb-0">{service.description}</p>
                  {/* <p className="xl fw-bold text-black">
                    {removeWidows(offeringsTitle)}
                  </p> */}
                  {/* <ServiceList>
                    {service.offerings.map((offering) => (
                      <li key={uuidv4()}>
                        <p className="xl mb-0 text-black">
                          {removeWidows(offering)}
                        </p>
                      </li>
                    ))}
                  </ServiceList> */}
                </div>
              </div>
            </div>
          );
        })}
      </TabContent>
    </section>
  );
};

const Tab = styled.div`
  min-width: 25%;
  max-width: 160px;
  flex-shrink: 0;
  position: relative;

  @media ${media.sm} {
    max-width: 200px;
  }

  @media ${media.md} {
    max-width: 220px;
  }

  @media ${media.lg} {
    max-width: 25%;
  }

  &.tab-active {
    &::before {
      background-image: none;
    }
  }

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='1' xmlns='http://www.w3.org/2000/svg'%3E%3Cline y1='0.5' x2='12' y2='0.5' stroke='%23192433' stroke-opacity='0.7' stroke-dasharray='6 6'/%3E%3C/svg%3E ");
    background-repeat: repeat-x;
  }

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: 1px;
    position: absolute;
    top: 0;
    right: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='1' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0.5' y1='0' x2='0.5' y2='12' stroke='%23192433' stroke-opacity='0.7' stroke-dasharray='6 6'/%3E%3C/svg%3E ");
    background-repeat: repeat-y;
  }

  &:last-child {
    &::after {
      background-image: none;
    }
  }
`;

const TabButton = styled.button`
  width: 100%;
  min-width: 140px;
  height: 100%;
  padding: 1.75rem 1rem;
  margin: 0;
  border: none;
  background: var(--bs-white);
  color: var(--bs-black);
  font-size: 1rem;
  transition: 0.3s background;

  &:hover {
    background-color: var(--bs-gray-300);
  }

  @media ${media.sm} {
    font-size: 1.25rem;
    padding: 2rem 1.5rem;
  }

  @media ${media.md} {
    font-size: 1.5rem;
    padding: 2rem 1.5rem;
  }

  @media ${media.lg} {
    font-size: 1.75rem;
    padding: 2.5rem 2rem;
  }

  @media ${media.xl} {
    font-size: 2rem;
    padding: 2.5rem 2.25rem;
  }

  @media ${media.xl} {
    font-size: 2rem;
    padding: 3.5rem 2.25rem;
  }

  &.tab-active {
    background: var(--bs-gray-100);
    font-weight: 600;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(33, 29, 29, 0.75) 0%,
    rgba(15, 15, 15, 0) 15%
  );
  background-position: center;
  mix-blend-mode: multiply;
  pointer-events: none;
  opacity: 0;
  transition: 0.2s opacity;

  &.right {
    background: linear-gradient(
      270deg,
      rgba(33, 29, 29, 0.75) 0%,
      rgba(15, 15, 15, 0) 15%
    );
  }

  &.show {
    opacity: 1;
  }
`;

const TabContent = styled.div`
  background: var(--bs-gray-100);
`;

const Title = styled.h4`
  color: var(--bs-gray-800);
  margin-bottom: 1.5rem;
`;

const ServiceList = styled.ul`
  columns: 2 15rem;
  column-gap: 3.5rem;
`;

export default KeyServices;
