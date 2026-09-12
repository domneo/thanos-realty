import { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

import media from "styles/media";

import ChevronLeftIcon from "components/icons/ChevronLeftIcon";
import ChevronRightIcon from "components/icons/ChevronRightIcon";

interface PrevNextArrowProps extends CustomArrowProps {
  type: string;
}

const PrevNextArrow = ({
  type,
  className,
  style,
  onClick,
}: PrevNextArrowProps) => {
  const Arrow = type === "prev" ? ArrowLeft : ArrowRight;
  const ArrowIcon = type === "prev" ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <Arrow className="btn btn-sm icon" onClick={onClick}>
      <ArrowIcon />
    </Arrow>
  );
};

const CustomArrowButton = styled.button`
  display: none;
  position: absolute;
  top: 72%;
  width: 4rem;
  height: 4rem;
  z-index: 100;
  padding: 1rem 1.5rem;
  color: var(--bs-white);
  background-color: rgba(35, 35, 35, 0.75);
  opacity: 0.75;
  cursor: pointer;

  &:hover,
  &:focus {
    color: var(--bs-white);
    opacity: 1;
    transition: 0.3s opacity;
  }

  &:focus {
    box-shadow: 0 0 0 0.25rem rgb(255, 255, 255, 25%);
  }

  @media ${media.md} {
    display: block;
  }

  @media ${media.xl} {
    top: 64%;
  }
`;

const ArrowLeft = styled(CustomArrowButton)`
  right: 104px;

  @media ${media.xl} {
    right: 152px;
  }
`;

const ArrowRight = styled(CustomArrowButton)`
  right: 40px;

  @media ${media.xl} {
    right: 88px;
  }
`;

export default PrevNextArrow;
