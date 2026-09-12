import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("hide_cookiebanner") !== null) {
      hideCookieBanner();
    }
  }, []);

  const hideCookieBanner = () => {
    setIsVisible(false);
    localStorage.setItem("hide_cookiebanner", "1");
  };

  return (
    <Root
      className={`container position-fixed bottom-0 start-0 end-0 ${
        isVisible ? "d-block" : "d-none"
      }`}
    >
      <div className="row">
        <div className="col bg-white d-flex align-items-center justify-content-between flex-column flex-lg-row py-4 px-5 shadow rounded">
          <p className="mb-0 text-dark text-center text-md-start">
            We use cookies to ensure you get the best experience on our website.{" "}
            <Link href={"/privacy-policy"}>
              <a className="text-dark d-inline-block">
                <strong>Privacy Policy</strong>
              </a>
            </Link>
          </p>
          <div className="flex-shrink-0 d-flex align-items-center flex-column flex-sm-row">
            <button
              className="btn btn-secondary mt-3 mt-sm-4 mt-lg-0 mx-sm-3"
              onClick={hideCookieBanner}
            >
              I understand
            </button>
          </div>
        </div>
      </div>
      <button
        className="position-absolute top-0 end-0 bg-transparent border-0 d-flex align-items-center justify-content-center p-2"
        style={{ width: "40px", height: "40px" }}
        onClick={hideCookieBanner}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.5509 23.3764L18.1692 15.9797L25.5109 8.62347C26.1096 8.02324 26.1096 7.05025 25.5109 6.45035C24.9119 5.85045 23.9411 5.85045 23.3421 6.45035L16.0004 13.8066L8.65909 6.45035C8.06006 5.85045 7.08932 5.85045 6.49029 6.45035C5.89125 7.05058 5.89125 8.02357 6.49029 8.62347L13.8316 15.9797L6.44928 23.3764C5.85024 23.9767 5.85024 24.9493 6.44928 25.5496C6.7488 25.8497 7.14116 25.9996 7.53385 25.9996C7.92654 25.9996 8.3189 25.8497 8.61841 25.5496L16.0004 18.1529L23.3821 25.5496C23.6816 25.8497 24.074 25.9996 24.4667 25.9996C24.8594 25.9996 25.2517 25.8497 25.5513 25.5496C26.1496 24.9497 26.1496 23.9767 25.5509 23.3764Z"
            fill="#414d5d"
          />
        </svg>
      </button>
    </Root>
  );
};

const Root = styled.div`
  z-index: 999;
`;
