import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import media from "styles/media";

interface HeartIconProps {
  mode: "light" | "dark";
  savedCount: number;
}

export const HeartIcon = ({ mode, savedCount }: HeartIconProps) => {
  const [count, setCount] = useState(savedCount);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // If saved count increases, animate
    if (savedCount > count) {
      setIsAnimating(true);
    }

    // Update count
    setCount(savedCount);

    // After animation complete, reset animation state
    let animateTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 600);

    return () => {
      clearTimeout(animateTimeout);
    };
  }, [savedCount, count]);

  // Determine heart color
  const [color, setColor] = useState("#FFFFFF");
  useEffect(() => {
    if (count > 0) {
      setColor("#F42C74");
    } else {
      setColor(mode === "light" ? "#054650" : "#FFFFFF");
    }
  }, [count, mode]);

  return (
    <Heart>
      <HeartOutline
        width="37"
        height="36"
        viewBox="0 0 37 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.5 6.01122C22.4635 6.01122 20.5449 6.80785 19.1031 8.24965L18.5084 8.84432L17.9025 8.23843C16.4607 6.79663 14.5421 6 12.5056 6C10.4747 6 8.5617 6.79102 7.1199 8.23282C5.67811 9.67461 4.88708 11.5877 4.88708 13.6241C4.88708 15.6606 5.68372 17.5736 7.12551 19.0154L17.8128 29.7027L17.8352 29.7251C18.0203 29.9102 18.2672 30 18.5084 30C18.7553 30 19.0021 29.9046 19.1872 29.7195L29.8745 19.0323C31.3163 17.5905 32.1129 15.6774 32.1129 13.641C32.1129 11.6045 31.3219 9.68583 29.8801 8.24965C28.4439 6.80224 26.5308 6.01122 24.5 6.01122ZM28.5168 17.669L18.514 27.6774L8.48877 17.6522C7.41163 16.575 6.81696 15.1445 6.81135 13.6185C6.81135 12.0982 7.40041 10.6676 8.47755 9.59046C9.55469 8.51893 10.9853 7.92426 12.5 7.92426C14.0259 7.92426 15.4565 8.51893 16.5393 9.60168L17.824 10.8864C18.183 11.2454 18.8226 11.2454 19.1872 10.8864L20.4663 9.60729C21.5435 8.53015 22.9797 7.93548 24.5 7.93548C26.0203 7.93548 27.4509 8.53015 28.528 9.60729C29.6052 10.6844 30.1999 12.115 30.1942 13.641C30.1942 15.1613 29.5996 16.5919 28.5168 17.669Z"
          fill={color}
        />
      </HeartOutline>
      {count > 0 && (
        <>
          <InnerHeart
            className={isAnimating ? "is-animating" : ""}
            width="37"
            height="36"
            viewBox="0 0 37 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M29.2228 18.3772L29.2221 18.3779L18.5142 29.0918L7.78166 18.3593C6.5174 17.095 5.81793 15.4114 5.81135 13.6222L5.81134 13.6185C5.81135 11.8343 6.50484 10.149 7.77044 8.88336L7.77229 8.88151C9.03513 7.62525 10.7186 6.92426 12.5 6.92426C14.2926 6.92426 15.9771 7.62531 17.2464 8.89458L18.5056 10.1538L19.7592 8.90019C21.0238 7.63564 22.7143 6.93548 24.5 6.93548C26.2868 6.93548 27.9713 7.63638 29.2352 8.90019C30.4987 10.1638 31.2003 11.8488 31.1942 13.6425"
              fill={color}
            />
          </InnerHeart>
          <Ring className={isAnimating ? "is-animating" : ""} />
        </>
      )}
    </Heart>
  );
};

const innerHeartAnim = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(2);
  }
  65% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

const ringAnim = keyframes`
  0% {
    transform: translateY(-1px) scale(0);
    opacity: 0;
    box-shadow: inset 0 0 0 2.25rem #FFFFFF;
  }
  15% {
    transform: translateY(-1px) scale(1);
    opacity: 1;
    box-shadow: inset 0 0 0 2.25rem #FFFFFF;
  }
  20% {
    transform: translateY(-1px) scale(1.75);
    opacity: 1;
    box-shadow: inset 0 0 0 0.3rem #F42C74;
  }
  100% {
    transform: translateY(-1px) scale(2.5);
    opacity: 0;
    box-shadow: inset 0 0 0 0 #F42C74;
  }
`;

const Heart = styled.div`
  position: relative;
  width: 24px;
  height: 24px;

  @media ${media.sm} {
    width: 36px;
    height: 36px;
  }
`;

const HeartOutline = styled.svg`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

const InnerHeart = styled.svg`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transform-origin: center;

  &.is-animating {
    animation-name: ${innerHeartAnim};
    animation-duration: 0.5s;
    animation-timing-function: ease-in;
    animation-iteration-count: 1;
  }
`;

const Ring = styled.div`
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 50%;
  transform-origin: center;

  &.is-animating {
    animation-name: ${ringAnim};
    animation-duration: 0.5s;
    animation-timing-function: ease;
    animation-iteration-count: 1;
  }
`;
