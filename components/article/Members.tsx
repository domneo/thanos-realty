import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

import { MemberData } from "types/content";

interface ArticleMembersProps {
  title: string;
  members: MemberData[];
}

const Members = ({ title, members }: ArticleMembersProps) => {
  const { image, first_name, last_name, position, email, phone, mobile } =
    members[0];

  return (
    <section className="position-relative container-fluid py-5 py-md-6 overflow-hidden">
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
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <Box className="bg-white p-4 p-sm-5 px-lg-4 py-xxl-6">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <h3 className="mb-4">{title}</h3>
                  <div className="row justify-content-center">
                    <ImageCol className="col-lg-6 pb-4 pb-lg-0 pe-lg-5">
                      <ImageWrapper>
                        <Image
                          // TODO: placeholder image
                          src={image || ""}
                          alt={`${first_name} ${last_name}`}
                          layout="fill"
                          objectFit="cover"
                          objectPosition={"center"}
                        />
                      </ImageWrapper>
                    </ImageCol>
                    <div className="col-lg-6 ps-lg-5">
                      <h5 className="mb-2">
                        {first_name} {last_name}
                      </h5>
                      <p className="subheading sm text-black mb-3">
                        {position}
                      </p>
                      {email && (
                        <div className="d-flex align-items-center mb-3">
                          <div className="d-flex align-items-center flex-shrink-0">
                            <Image
                              src={`/images/icon-mail.svg`}
                              alt="icon"
                              width={32}
                              height={32}
                            />
                          </div>
                          <Link href={`mailto:${email}`}>
                            <a className="ms-3 ms-sm-4">
                              <p className="mb-0 text-break">Email</p>
                            </a>
                          </Link>
                        </div>
                      )}
                      <div className="d-flex align-items-center mb-3">
                        <div className="d-flex align-items-center flex-shrink-0">
                          <Image
                            src={`/images/icon-whatsapp.png`}
                            alt="icon"
                            width={32}
                            height={32}
                          />
                        </div>
                        <Link href="https://wa.me/message/">
                          <a className="ms-3 ms-sm-4">
                            <p className="mb-0">{removeWidows(`WhatsApp`)}</p>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col px-0 position-relative col-md-10 col-lg-12"></div>
        </div>
      </div>
    </section>
  );
};

const BgImageWrapper = styled.div`
  z-index: -1;
`;

const Box = styled.div`
  box-shadow: 0px 4px 48px 0px rgba(0, 0, 0, 0.08);
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 2rem;
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 1rem;

  @media ${media.sm} {
    border-bottom-left-radius: 3rem;
    border-top-right-radius: 3rem;
  }

  @media ${media.lg} {
    border-bottom-left-radius: 4rem;
    border-top-right-radius: 4rem;
  }

  @media ${media.xxl} {
    border-bottom-left-radius: 5rem;
    border-top-right-radius: 5rem;
  }
`;

const ImageCol = styled.div`
  @media ${media.lg} {
    border-right: 1px solid var(--bs-gray-500);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  width: 100%;
  height: 200px;

  @media ${media.sm} {
    height: 280px;
  }

  @media ${media.md} {
    height: 360px;
  }

  @media ${media.lg} {
    height: 280px;
  }

  @media ${media.xl} {
    height: 240px;
  }

  @media ${media.xxl} {
    height: 260px;
  }
`;

const Line = styled.div`
  width: 0;
  height: 80%;
  padding: 0;
  border-left: 1px solid var(--bs-gray-500);
`;

export default Members;
