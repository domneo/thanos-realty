import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import media from "styles/media";

interface DotsProps {
  dots: JSX.Element[];
  progress: number;
  transition: boolean;
  progressSpeed: number;
  currentSlide: number;
}

const Dots = ({
  dots,
  progress,
  transition,
  progressSpeed,
  currentSlide,
}: DotsProps) => {
  const dotButtons: JSX.Element[] = dots.map((dot) => dot.props.children);

  return (
    <Root className="d-flex">
      <Progress className="progress w-100">
        <ProgressBar
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${progress}%`,
            transition: transition
              ? `width ${progressSpeed}s ease-in-out`
              : "none",
          }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </Progress>
      <ul className="d-flex p-0 my-0 mx-2 mx-md-4 me-xl-6 list-unstyled">
        {dotButtons.map((dotButton, index) => {
          return (
            <li key={uuidv4()} className="d-flex align-items-center">
              <Button
                onClick={dotButton?.props.onClick}
                className={currentSlide === index ? "dot-active" : ""}
              >
                <Dot />
              </Button>
            </li>
          );
        })}
      </ul>
    </Root>
  );
};

const Root = styled.div`
  position: absolute;
  bottom: 6px;
  left: 0;
  right: 0;

  @media ${media.md} {
    background: linear-gradient(
      0deg,
      rgba(35, 35, 35, 0.5) 0%,
      rgba(35, 35, 35, 0) 100%
    );
  }
`;

const Progress = styled.div`
  height: 0.125rem;
  margin: 19px 0;
  overflow: visible;
  align-items: center;
  background-color: var(--bs-gray-400);

  @media ${media.md} {
    margin: 35px 0;
  }
`;

const ProgressBar = styled.div`
  height: 0.25rem;
  border-radius: 0.25rem;
  background-color: var(--bs-white);
`;

const Button = styled.button`
  background: transparent;
  border: none;
  padding: 0.75rem;
  margin: 0;
  opacity: 0.5;

  &:hover,
  &:focus {
    opacity: 0.75;
  }

  &.dot-active {
    opacity: 1;
  }

  @media ${media.md} {
    padding: 1rem;
  }
`;

const Dot = styled.div`
  background: var(--bs-white);
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 1rem;
`;

export default Dots;
