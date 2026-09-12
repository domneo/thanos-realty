import parse, { domToReact, DOMNode } from "html-react-parser";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

import { FacilityData } from "types/content";

const options = {
  replace: (domNode: DOMNode) => {
    // @ts-ignore
    const { attribs, type, name, children, parent } = domNode;
    if (attribs && type === "tag") {
      switch (name) {
        case "h1":
          return (
            <h3 className="sans-serif fw-bold">
              {domToReact(children, options)}
            </h3>
          );
        case "h2":
          return (
            <h4 className="sans-serif fw-bold">
              {domToReact(children, options)}
            </h4>
          );
        case "h3":
          return (
            <h5 className="sans-serif fw-bold">
              {domToReact(children, options)}
            </h5>
          );
        case "p":
          const hasImg =
            children.filter((child: any) => child.name === "img").length > 0;
          if (hasImg) {
            return <>{domToReact(children, options)}</>;
          } else {
            return <p className="mb-3">{domToReact(children, options)}</p>;
          }
        case "blockquote":
          return (
            <Blockquote className="blockquote">
              {domToReact(children, options)}
            </Blockquote>
          );
        case "img":
          /* eslint-disable-next-line @next/next/no-img-element */
          return <img src={attribs.src} alt={attribs.alt} loading="lazy" />;
        case "hr":
          return <hr className="my-5" />;
      }
    }
    if (type === "text" && parent === null) {
      // @ts-ignore
      const { data } = domNode;

      if (data === "\n") return data;

      return <p className="mb-3">{data}</p>;
    }
  },
};

interface AdditionalDetailsProps {
  description: string;
  facilities: FacilityData[];
}

export const AdditionalDetails = ({
  description,
  facilities,
}: AdditionalDetailsProps) => {
  return (
    <>
      <div>
        <p className="subheading sm text-gray mb-3">Description</p>
        {parse(description, options)}
      </div>
      {facilities.length > 0 && (
        <div className="mt-5">
          <p className="subheading sm text-gray mb-3">Amenities</p>
          <ul className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 mb-0">
            {facilities.map((facility) => (
              <li key={facility.id} className="col text-black ps-0 pe-5 mb-3">
                {facility.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

const Blockquote = styled.blockquote`
  border-left: 1px solid var(--bs-gray-700);
  padding-left: 1.5rem;

  @media ${media.sm} {
    padding-left: 2rem;
  }

  @media ${media.md} {
    padding-left: 2.5rem;
  }

  @media ${media.lg} {
    padding-left: 3rem;
  }
`;
