import Image from "next/image";
import Link from "next/link";
import reactStringReplace from "react-string-replace";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

interface CTAProps {
  contents: {
    title: string;
    subtitle: string;
    email?: string;
  };
}

const CTA = ({ contents }: CTAProps) => {
  const { title, subtitle, email } = contents;

  return (
    <Root className="container-fluid position-relative overflow-hidden">
      <BgImageWrapper className="position-absolute top-0 bottom-0 start-0 end-0">
        <div className="position-relative w-100 h-100">
          <Image
            src={`/images/cta_bg.jpg`}
            alt={`modern workplace`}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      </BgImageWrapper>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9 text-center">
            <h2 className="mb-4 text-white">{removeWidows(title, true)}</h2>
            <Subtitle className="text-white">
              {removeWidows(
                reactStringReplace(subtitle, "$HOME_CTA_EMAIL", (match, i) => (
                  <Link key={i} href={`mailto:${email}`}>
                    <a className="text-white">{email}</a>
                  </Link>
                ))
              )}
            </Subtitle>
          </div>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.section`
  padding-top: 6rem;
  padding-bottom: 4rem;

  @media ${media.md} {
    padding-top: 10rem;
    padding-bottom: 7rem;
  }

  @media ${media.lg} {
    padding-top: 13rem;
    padding-bottom: 9rem;
  }

  @media ${media.xl} {
    padding-top: 16rem;
    padding-bottom: 11rem;
  }
`;

const BgImageWrapper = styled.div`
  z-index: -1;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 5vw, 1.25rem);
`;

export default CTA;
