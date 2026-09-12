import parse, { domToReact, DOMNode } from "html-react-parser";
import React from "react";
import styled from "styled-components";

import media from "styles/media";

import { ShareLinks } from "./ShareLinks";

const options = {
  replace: (domNode: DOMNode) => {
    // @ts-ignore
    const { attribs, type, name, children, parent } = domNode;
    if (attribs && type === "tag") {
      switch (name) {
        case "h1":
          return (
            <div className="w-100">
              <h3 className="sans-serif fw-bold my-5">
                {domToReact(children, options)}
              </h3>
            </div>
          );
        case "h2":
          return (
            <div className="w-100">
              <h4 className="sans-serif fw-bold my-5">
                {domToReact(children, options)}
              </h4>
            </div>
          );
        case "h3":
          return (
            <div className="w-100">
              <h5 className="sans-serif fw-bold my-5">
                {domToReact(children, options)}
              </h5>
            </div>
          );
        case "p":
          const hasImg =
            children.filter((child: any) => child.name === "img").length > 0;
          if (hasImg) {
            return <>{domToReact(children, options)}</>;
          } else {
            return (
              <div className="w-100">
                <p className="lg mb-5">{domToReact(children, options)}</p>
              </div>
            );
          }
        case "blockquote":
          return (
            <div className="w-100">
              <Blockquote className="blockquote">
                {domToReact(children, options)}
              </Blockquote>
            </div>
          );
        case "img":
          return (
            <ImageWrapper className="full-width">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={attribs.src} alt={attribs.alt} loading="lazy" />
            </ImageWrapper>
          );
        case "hr":
          return (
            <div className="w-100">
              <hr className="my-5" />
            </div>
          );
        case "ul":
          return (
            <div className="w-100">
              <ul className="mb-5">{domToReact(children, options)}</ul>
            </div>
          );
        case "ol":
          return (
            <div className="w-100">
              <ol className="mb-5">{domToReact(children, options)}</ol>
            </div>
          );
        case "li":
          return <li className="lg mb-3">{domToReact(children, options)}</li>;
        case "video":
          return (
            <VideoWrapper className="full-width">
              <video controls controlsList="nodownload" width={"100%"}>
                <source src={attribs.src} type="video/mp4" />
                Sorry, your browser doesn&apos;t support embedded videos.
              </video>
            </VideoWrapper>
          );
        case "div":
          if (attribs.class.includes("html5-video")) {
            return <>{domToReact(children, options)}</>;
          }
      }
    }
    if (type === "text" && parent === null) {
      // @ts-ignore
      const { data } = domNode;

      if (data === " ") return data;

      return (
        <div className="w-100">
          <p className="lg mb-5">{data}</p>
        </div>
      );
    }
  },
};

interface ArticleBodyProps {
  title?: string;
  summary?: string;
  content?: string;
}

const Body = ({ title, summary, content }: ArticleBodyProps) => {
  const contentStripped = content?.replace(/(\r\n|\n|\r|\t)/gm, "");

  return (
    <section className="container-fluid overflow-hidden px-3 pb-5 pb-md-6">
      <div className="row justify-content-center">
        <div className="col text-dark px-sm-4">
          <Content>
            {contentStripped && parse(contentStripped, options)}
          </Content>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 px-0 d-flex justify-content-end mt-5">
            <ShareLinks title={title} summary={summary} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:not(.full-width) {
    max-width: 100%;

    @media ${media.sm} {
      max-width: 508px;
    }

    @media ${media.md} {
      max-width: 688px;
    }

    @media ${media.lg} {
      max-width: 768px;
    }

    @media ${media.xl} {
      max-width: 918px;
    }
  }
`;

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

const ImageWrapper = styled.div`
  display: block;
  margin: 0 auto 3rem;
  text-align: center;
  width: 100%;
  max-width: 1280px;

  img {
    max-width: 100%;
    max-height: 720px;
  }
`;

const VideoWrapper = styled.div`
  display: block;
  margin: 0 auto 3rem;
  text-align: center;
  width: 100%;
  max-width: 1280px;
`;

export default Body;
