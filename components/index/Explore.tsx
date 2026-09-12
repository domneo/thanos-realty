import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

interface ExploreProps {
  contents: {
    title: string;
    button: {
      text: string;
      link: string;
    };
  };
}

const Explore = ({ contents }: ExploreProps) => {
  const { title, button } = contents;

  return (
    <Root className="container-fluid">
      <div className="container position-relative">
        <BgImageWrapper className="position-absolute top-0 bottom-0 start-0 end-0">
          <div className="position-relative w-100 h-100">
            <Image
              src={`/images/explore-market-options.jpg`}
              alt="cityscape"
              layout="fill"
              objectFit="cover"
              objectPosition={"center"}
            />
          </div>
        </BgImageWrapper>
        <div className="row">
          <div className="col-sm-10 col-md-8 col-xl-7 col-xxl-6 p-3 p-sm-4 p-lg-5">
            <Content className="position-relative overflow-hidden">
              <div className="position-absolute top-0 start-0 end-0 d-flex align-items-start">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 435 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0H435V5.5L0 16V0Z" fill="#CB6344" />
                </svg>
              </div>
              <h3 className="mb-4 text-dark">{removeWidows(title)}</h3>
              <Link href={button.link}>
                <a className="btn btn-primary btn-darkgreen">
                  {removeWidows(button.text)}
                </a>
              </Link>
            </Content>
          </div>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.section`
  padding: 0 1rem 5rem;

  @media ${media.md} {
    padding: 0 1rem 9rem;
  }
`;

const BgImageWrapper = styled.div`
  z-index: -1;
`;

const Content = styled.div`
  background: var(--bs-white);
  box-shadow: 0px 4px 48px 0px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  border-radius: 0.5rem 2rem;
  margin-top: 200px;

  @media ${media.sm} {
    padding: 2rem 3rem;
    border-radius: 0.5rem 3rem;
  }

  @media ${media.lg} {
    padding: 3.5rem 4rem;
    border-radius: 1rem 5rem;
    margin-top: 240px;
  }

  @media ${media.xxl} {
    margin-top: 280px;
  }
`;

export default Explore;
