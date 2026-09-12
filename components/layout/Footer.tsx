import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";

import { onSubmit } from "./Footer/onSubmit";

export interface Inputs {
  email: string;
}

const Footer = () => {
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <Root className="position-relative container-fluid">
      <BgImageWrapper className="position-absolute top-0 bottom-0 start-0 end-0">
        <div className="position-relative w-100 h-100">
          <Image
            src={`/images/footer-bg.jpg`}
            alt={`background ellipses`}
            layout="fill"
            objectFit="cover"
            objectPosition="95% center"
          />
        </div>
      </BgImageWrapper>
      <Rectangle />
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-5">
            <h5 className="text-black mb-2">
              {removeWidows("Subscribe to Community Newsletter")}
            </h5>
            <form
              onSubmit={handleSubmit((formData) => {
                setIsSubmitting(true);
                setShowSuccess(false);
                setShowError(false);
                onSubmit(formData).then((json) => {
                  if (json.status === "success") {
                    console.log("Form submitted!");
                    setShowSuccess(true);
                    setIsSubmitting(false);
                  } else {
                    console.error(json.message);
                    setShowError(true);
                    setIsSubmitting(false);
                  }
                });
              })}
            >
              <div className="py-4">
                <label
                  className="form-label text-black"
                  htmlFor="subscribeEmail"
                >
                  Your Email Address
                </label>
                <EmailField
                  type="email"
                  id="subscribeEmail"
                  className={`form-control form-control-lg
                  ${errors.email ? "is-invalid" : ""}
                  ${showSuccess && !errors.email ? "is-valid" : ""}
                  `}
                  {...register("email", {
                    required: "Please enter a valid email address",
                    pattern: {
                      value:
                        /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    <p className="mb-0">{removeWidows(errors.email.message)}</p>
                  </div>
                )}
              </div>
              {showSuccess && (
                <p className="text-primary mb-4">
                  {removeWidows(
                    "You have successfully subscribed to our mailing list."
                  )}
                </p>
              )}
              {showError && (
                <p className="text-danger mb-4">
                  {removeWidows(
                    "Sorry, an error occurred while trying to submit the form. Please try submitting the form again."
                  )}
                </p>
              )}
              <SubmitButton
                type="submit"
                value={isSubmitting ? "Submitting..." : "Subscribe Now"}
                className="btn btn-secondary btn-lg w-100"
                style={{ minWidth: "160px" }}
                disabled={isSubmitting}
              />
              <Terms className="small mt-5">
                By sharing your email, you agree to our{" "}
                <Link href={"/privacy-policy"}>
                  <a>Privacy&nbsp;Policy</a>
                </Link>{" "}
                and{" "}
                <Link href={"/terms-and-conditions"}>
                  <a>Terms&nbsp;and&nbsp;Conditions</a>
                </Link>
              </Terms>
            </form>
          </div>
          <div className="col-md-5 offset-md-1 col-lg-6 d-lg-flex flex-column justify-content-between">
            <div className="row mt-5 mt-md-0 justify-content-lg-end">
              <div className="col-lg-5 col-xl-4 mt-5 mt-md-0">
                <h5 className="mb-4">Contact</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link href="tel:+65 6555 0170" passHref>
                      <MenuLink className="text-black" target={"_blank"}>
                        +65 6555 0170
                      </MenuLink>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-7 col-xl-6 col-xxl-5 mt-5 mt-lg-0">
                <h5 className="mb-4">Office</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link href="https://maps.google.com/" passHref>
                      <MenuLink className="text-black" target={"_blank"}>
                        12 Horizon Quay
                        <br />
                        #18-03 Meridian Bay&nbsp;Tower
                        <br />
                        Singapore&nbsp;059120
                      </MenuLink>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row mt-6">
              <div className="col text-lg-end">
                <Link href="/privacy-policy" passHref>
                  <MenuLink className="d-inline-block text-black me-2">
                    Privacy Policy
                  </MenuLink>
                </Link>
                <span className="me-2">|</span>
                <Link href="/terms-and-conditions" passHref>
                  <MenuLink className="d-inline-block text-black me-2">
                    Terms and Conditions
                  </MenuLink>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.footer`
  background: var(--bs-gray-200);
  color: var(--bs-black);
  padding: 4.5rem 1rem 3.5rem;
  z-index: 500;

  @media ${media.sm} {
    padding: 6rem 1rem 4.5rem;
  }

  @media ${media.md} {
    padding: 9rem 1rem 6rem;
  }

  @media ${media.xl} {
    padding: 11rem 1rem 8rem;
  }
`;

const BgImageWrapper = styled.div`
  z-index: -1;
  pointer-events: none;
  opacity: 0.3;

  @media ${media.md} {
    opacity: 1;
  }
`;

const Rectangle = styled.div`
  width: 50px;
  height: 16px;
  background: var(--bs-lightgreen);
  position: absolute;
  top: 2rem;
  left: 0;

  @media ${media.sm} {
    top: 3rem;
  }

  @media ${media.md} {
    top: 6rem;
  }

  @media ${media.xl} {
    top: 7rem;
  }
`;

const EmailField = styled.input`
  font-size: 1rem;
`;

const SubmitButton = styled.input`
  border-radius: 0.5rem;
`;

const Terms = styled.div`
  color: var(--bs-gray-600);

  a {
    color: var(--bs-gray-600);
  }
`;

const MenuLink = styled.a`
  line-height: 2rem;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export default Footer;
