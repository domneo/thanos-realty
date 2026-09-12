import { useEffect, useState } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import styled from "styled-components";

import media from "styles/media";

import ShareFacebookIcon from "components/icons/ShareFacebookIcon";
import ShareLinkIcon from "components/icons/ShareLinkIcon";
import ShareLinkedinIcon from "components/icons/ShareLinkedinIcon";
import ShareTwitterIcon from "components/icons/ShareTwitterIcon";

interface ShareLinksProps {
  title?: string;
  summary?: string;
}
export const ShareLinks = ({ title, summary }: ShareLinksProps) => {
  const [shareURL, setShareURL] = useState("#");
  useEffect(() => setShareURL(window.location.href), []);

  // Copy link
  const [isLinkCopiedTextVisible, setIsLinkCopiedTextVisible] = useState(false);
  useEffect(() => {
    let timeout = setTimeout(() => setIsLinkCopiedTextVisible(false), 4000);
    return () => clearTimeout(timeout);
  }, [isLinkCopiedTextVisible]);

  return (
    <div className="row align-items-center justify-content-end gx-3">
      <div className="col">
        <ShareText className="text-gray mb-0">Share</ShareText>
      </div>
      <div className="col">
        <FacebookShareButton url={shareURL}>
          <ShareLink className="text-black">
            <ShareFacebookIcon />
          </ShareLink>
        </FacebookShareButton>
      </div>
      <div className="col">
        <TwitterShareButton url={shareURL} title={title}>
          <ShareLink className="text-black">
            <ShareTwitterIcon />
          </ShareLink>
        </TwitterShareButton>
      </div>
      <div className="col">
        <LinkedinShareButton url={shareURL} title={title} summary={summary}>
          <ShareLink className="text-black">
            <ShareLinkedinIcon />
          </ShareLink>
        </LinkedinShareButton>
      </div>
      <div className="col position-relative">
        <LinkCopiedText
          className={`${isLinkCopiedTextVisible ? "is-visible" : ""}`}
        >
          Link copied!
        </LinkCopiedText>
        <LinkCopyButton
          onClick={() => {
            navigator.clipboard.writeText(shareURL);
            setIsLinkCopiedTextVisible(true);
          }}
        >
          <ShareLink className="text-black">
            <ShareLinkIcon />
          </ShareLink>
        </LinkCopyButton>
      </div>
    </div>
  );
};

const ShareText = styled.p`
  color: var(--bs-gray-700);
`;

export const ShareLink = styled.div`
  width: 2rem;
  height: 2rem;
  transition: 0.3s all;

  &:hover,
  &:focus {
    opacity: 0.8;
  }

  @media ${media.md} {
    width: 3rem;
    height: 3rem;
  }
`;

const LinkCopyButton = styled.button`
  background: transparent;
  border: none;
  margin: 0;
  padding: 0;
  z-index: 1;
`;

const LinkCopiedText = styled.span`
  position: absolute;
  top: -120%;
  left: 0;
  right: 0;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  line-height: 1.2;
  z-index: 0;
  pointer-events: none;
  color: var(--bs-success);
  opacity: 0;
  transform: translateY(75%);
  transition: 0.3s all;

  @media ${media.lg} {
    top: -75%;
  }

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
    transition: 0.3s all;
  }
`;
