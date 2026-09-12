import Image from "next/image";
import styled from "styled-components";

import media from "styles/media";

interface SlideBgImageProps {
  image?: string;
  title?: string;
  priority: boolean;
}

const SlideBgImage = ({ image, title, priority }: SlideBgImageProps) => {
  return (
    <Root>
      {image && (
        <Image
          src={image}
          alt={title || ""}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority={priority}
          className="d-md-none"
        />
      )}
      {image && (
        <HeroBgDesktop
          src={image}
          alt={title || ""}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority={priority}
          className="d-none d-md-block"
        />
      )}
    </Root>
  );
};

const Root = styled.div`
  position: relative;
  min-height: 480px;
  height: 80vh;

  @media ${media.sm} {
    height: 90vh;
  }

  @media ${media.md} {
    min-height: 640px;
    height: 75vh;
  }

  @media ${media.lg} {
    height: 80vh;
  }

  @media ${media.xl} {
    height: 90vh;
  }
`;

const HeroBgDesktop = styled(Image)`
  z-index: -9999;
`;

export default SlideBgImage;
