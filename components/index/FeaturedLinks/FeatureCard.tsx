import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

interface FeatureCardProps {
  subheading: string;
  title: string;
  summary: string;
  link: string;
}

const FeatureCard = ({
  subheading,
  title,
  summary,
  link,
}: FeatureCardProps) => {
  return (
    <Root className="position-relative h-100 overflow-hidden bg-white">
      <BgImageWrapper className="position-absolute top-0 bottom-0 start-0 end-0">
        <div className="position-relative w-100 h-100">
          <Image
            src={`/images/grids.jpg`}
            alt={`grid background`}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      </BgImageWrapper>
      <Link href={link} passHref>
        <a
          className={`d-flex flex-column justify-content-between text-decoration-none h-100 p-4 p-sm-5`}
        >
          <div className="mt-3 my-xl-4">
            {subheading && <Subheading>{removeWidows(subheading)}</Subheading>}
            {title && (
              <Title className="text-black">{removeWidows(title)}</Title>
            )}
            {summary && (
              <Summary className="xl">{removeWidows(summary)}</Summary>
            )}
          </div>
        </a>
      </Link>
    </Root>
  );
};

const Root = styled.div`
  z-index: 0;
  border-radius: 1rem;
  box-shadow: 8px 0px 12px rgba(0, 0, 0, 0.12), 0px 8px 12px rgba(0, 0, 0, 0.03);
  min-height: 280px;

  @media ${media.sm} {
    min-height: 400px;
  }

  @media ${media.xl} {
    min-height: 480px;
  }

  @media ${media.xxl} {
    min-height: 560px;
  }
`;

const BgImageWrapper = styled.div`
  z-index: -1;
  opacity: 0;
  transform: scale(1);
  transform-origin: 25% 25%;
  transition: 0.8s opacity, 1.5s transform ease-in-out;

  ${Root}:hover &,
  ${Root}:focus & {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const Title = styled.h2`
  text-decoration: none;

  ${Root}:hover &,
  ${Root}:focus & {
    text-decoration: underline;
  }
`;

const Subheading = styled.h3`
  color: var(--bs-gray-400);
`;

const Summary = styled.p`
  color: var(--bs-gray-1000);
`;

export default FeatureCard;
