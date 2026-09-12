import "animate.css/animate.min.css";
import parse, { domToReact, DOMNode } from "html-react-parser";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { stripHtml } from "string-strip-html";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

import { SearchResultData } from "types/content";

const options = {
  replace: (domNode: DOMNode) => {
    // @ts-ignore
    const { attribs, type, name, children } = domNode;
    if (attribs && type === "tag") {
      switch (name) {
        case "b":
          if (attribs.class.includes("search-term")) {
            return <b>{domToReact(children, options)}</b>;
          }
        default:
          return <>{domToReact(children, options)}</>;
      }
    }
  },
};

interface SearchResultProps {
  data: SearchResultData;
  index: number;
  onResultClicked: () => void;
}

export const SearchResult = ({
  data,
  index,
  onResultClicked,
}: SearchResultProps) => {
  const {
    title,
    title_with_highlights,
    slug,
    summary,
    description,
    content,
    image,
    published_at,
    member,
    model,
  } = data;

  let subPath = "";
  let typeLabel;
  switch (model) {
    case "Post":
      subPath = "/articles";
      typeLabel = "ARTICLE";
      break;
    case "CaseStory":
      subPath = "/case-stories";
      typeLabel = "CASE STORY";
      break;
    case "Property":
      subPath = "/properties";
      typeLabel = "PROPERTY";
      break;
  }

  const publishedDate = DateTime.fromSQL(published_at || "", {
    zone: process.env.TIMEZONE,
  }).toFormat("dd LLLL yyyy");

  // Isolate search term within content
  const splitContentStart =
    (content?.indexOf('<b class="search-term">') || 0) - 200;
  const splitContentEnd = (content?.indexOf("</b>") || 0) + 200;

  // Get substring near the first search term
  let excerpt = stripHtml(content || description || "", {
    ignoreTagsWithTheirContents: ["b"],
  }).result.substring(splitContentStart, splitContentEnd);

  // Trim off any possible broken words at the ends
  const excerptArr = excerpt.split(" ");
  if (splitContentStart > 0) excerptArr.shift();
  if (content && splitContentEnd < content.length) excerptArr.pop();
  const excerptTrimmed = excerptArr.join(" ");

  return (
    <Root
      className={`row py-5 ${
        index !== 0 ? "border-top" : ""
      } animate__animated animate__fadeInUp animate__faster`}
    >
      <div className="col-sm-5 col-md-4">
        <Link href={`${subPath}/${slug}`} passHref>
          <ImageWrapper title={title} onClick={() => onResultClicked()}>
            {/* TODO: placeholder image */}
            <Image
              src={image || "https://via.placeholder.com/1440x900"}
              alt={title || ""}
              layout="fill"
              objectFit="cover"
              objectPosition={"center"}
              priority={index === 0}
            />
          </ImageWrapper>
        </Link>
      </div>
      <div className="col-sm-7 col-md-8">
        {typeLabel && (
          <p className="subheading sm text-black mb-3 mt-3 mt-sm-0">
            {typeLabel}
          </p>
        )}
        <Link href={`${subPath}/${slug}`} passHref>
          <TitleLink title={title} onClick={() => onResultClicked()}>
            <h5>{parse(title_with_highlights || "")}</h5>
          </TitleLink>
        </Link>
        {(publishedDate || member) && (
          <p className="text-black mb-3">
            {removeWidows(publishedDate)}
            {member && (
              <span>
                {publishedDate && <span className="mx-2">|</span>}
                <em>By {member}</em>
              </span>
            )}
          </p>
        )}
        {summary && (
          <p className="text-black mb-3">{parse(summary, options)}</p>
        )}
        {excerpt && (
          <p className="text-black small mb-0">
            {splitContentStart > 0 && "..."}
            {parse(excerptTrimmed, options)}
            {content && splitContentEnd < content.length && "..."}
          </p>
        )}
      </div>
    </Root>
  );
};

const Root = styled.article`
  &.border-top {
    border-color: var(--bs-gray-600) !important;
  }
`;

const ImageWrapper = styled.a`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  min-height: 150px;
  aspect-ratio: 1.7777;

  @media ${media.sm} {
    min-height: 200px;
    max-height: 300px;
  }

  @media ${media.lg} {
    min-height: 250px;
    max-height: 350px;
  }
`;

const TitleLink = styled.a`
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;
