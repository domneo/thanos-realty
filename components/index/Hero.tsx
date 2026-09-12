import React, { useEffect, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

import Dots from "./Hero/Dots";
import PrevNextArrow from "./Hero/PrevNextArrow";
import SlideBgImage from "./Hero/SlideBgImage";
import SlideContent from "./Hero/SlideContent";

import { CarouselsData } from "types/content";

interface HeroProps {
  carousels: CarouselsData;
}

const Hero = ({ carousels }: HeroProps) => {
  const slider = useRef<Slider>(null);
  const autoplaySpeed = 5000;
  const transitionSpeed = 800;
  const progressSpeed = (autoplaySpeed - transitionSpeed) / 1000;
  const [progress, setProgress] = useState(0);
  const [transition, setTransition] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Start progress animation for first slide
  useEffect(() => {
    setTimeout(() => setProgress(100), transitionSpeed);
  }, []);

  const settings: Settings = {
    autoplaySpeed: autoplaySpeed,
    autoplay: true,
    pauseOnHover: false,
    arrows: true,
    dots: true,
    accessibility: false,
    appendDots: function appendDots(dots) {
      return (
        <Dots
          dots={dots as JSX.Element[]}
          progress={progress}
          transition={transition}
          progressSpeed={progressSpeed}
          currentSlide={currentSlide}
        />
      );
    },
    infinite: true,
    speed: transitionSpeed,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevNextArrow type="prev" />,
    nextArrow: <PrevNextArrow type="next" />,
    beforeChange: (_, newIndex) => {
      setProgress(0);
      setTransition(false);
      setCurrentSlide(newIndex);
    },
    afterChange: () => {
      setTransition(true);
      setProgress(100);
    },
  };

  return (
    <Root className="overflow-hidden">
      <Slider ref={slider} {...settings}>
        {carousels.data.map((slide, index) => {
          return (
            <div
              key={slide.id}
              className="container-fluid position-relative px-0"
            >
              <SlideBgImage
                image={slide.image}
                title={slide.title}
                priority={index === 0}
              />
              <div className="position-absolute top-0 bottom-0 start-0 end-0 container px-0 px-md-3">
                <div className="row h-100 align-items-end align-items-md-center">
                  <SlideContent
                    title={slide.title}
                    description={slide.description}
                    cta_link={slide.cta_link}
                    cta_text={slide.cta_text}
                    isActiveSlide={currentSlide === index}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </Root>
  );
};

const Root = styled.section`
  margin-bottom: -6px;
`;

export default Hero;
