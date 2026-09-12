import "animate.css/animate.min.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface WrapperProps {
  isActive?: boolean;
  initiallyVisible?: boolean;
  duration?: number;
  delay?: number;
}

const Wrapper = styled.div<WrapperProps>`
  opacity: ${(props) => (props.isActive || props.initiallyVisible ? 1 : 0)};
  --animate-duration: ${(props) => props.duration}s;
  --animate-delay: ${(props) => props.delay}s;
`;

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animateIn: string;
  animateOut?: string;
  initiallyVisible?: boolean;
  offset?: string;
  duration?: number;
  delay?: number;
  animateOnce?: boolean;
}

const AnimateOnScroll = ({
  children,
  animateIn,
  animateOut,
  initiallyVisible = false,
  offset = "100%",
  duration = 1,
  delay = 0,
  animateOnce = false,
}: AnimateOnScrollProps) => {
  // Register the ScrollTrigger Plugin
  gsap.registerPlugin(ScrollTrigger);

  // Set the active state
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);

  // Target the div DOM element
  const animateEl = useRef<HTMLDivElement>(null);

  // Change the active state when scrolling into the viewport
  useEffect(() => {
    ScrollTrigger.create({
      // markers: true,
      id: "animate",
      trigger: animateEl.current,
      start: `top ${offset}`,
      onEnter: () => setIsActive(true),
      onLeaveBack: () => (animateOnce ? null : setIsActive(false)),
    });
  }, [offset, animateOnce]);

  return (
    <Wrapper
      ref={animateEl}
      className={`animate__animated 
        ${isActive ? `animate__${animateIn}` : `animate__${animateOut}`}
        ${delay > 0 ? "animate__delay-1s" : ""}
      `}
      isActive={isActive}
      initiallyVisible={initiallyVisible}
      duration={duration}
      delay={delay}
    >
      {children}
    </Wrapper>
  );
};

export default AnimateOnScroll;
