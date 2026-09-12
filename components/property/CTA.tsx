import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { removeWidows as stringRemoveWidows } from "string-remove-widows";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";
import media from "styles/media";
import { addProperty } from "utils/cartAPI";

import { SavedListingsContext } from "components/SavedListingsContext";
import { Modal } from "components/saved-listings/ConnectWithUs/Modal";

interface CTAProps {
  contents: {
    title: string;
    description: string;
    phone: {
      text: string;
      link: string;
    };
    whatsapp: {
      text: string;
      link: string;
    };
    button: {
      text: string;
      link: string;
    };
  };
  id: string;
}

export const CTA = ({ contents, id }: CTAProps) => {
  const { title, description, phone, whatsapp, button } = contents;

  const [showModal, setShowModal] = useState(false);
  const savedListings = useContext(SavedListingsContext);

  const saveBtnOnClick = () => {
    const payload = {
      session_id: localStorage.getItem("session_id") || "",
      property_id: id,
    };
    addProperty(payload).then((res) => {
      if (res.status === "success") {
        savedListings.update();
      }
    });
    setShowModal(true);
  };

  return (
    <Root>
      <h5 className="sans-serif fw-bold mb-4">
        {
          stringRemoveWidows(title, {
            convertEntities: false,
            minWordCount: 3,
          }).res
        }
      </h5>
      <p className="text-black">{removeWidows(description)}</p>
      <div className="mb-3">
        {phone && (
          <div className="d-flex align-items-center mb-1">
            <div className="d-flex align-items-center flex-shrink-0">
              <Image
                src={`/images/icon-phone.svg`}
                alt="icon"
                width={24}
                height={24}
              />
            </div>
            <Link href={phone.link}>
              <a className="ms-3 ms-sm-4">
                <p className="mb-0">{removeWidows(phone.text)}</p>
              </a>
            </Link>
          </div>
        )}
        {whatsapp && (
          <div className="d-flex align-items-center mb-1">
            <div className="d-flex align-items-center flex-shrink-0">
              <Image
                src={`/images/icon-whatsapp.png`}
                alt="icon"
                width={24}
                height={24}
              />
            </div>
            <Link href={whatsapp.link}>
              <a className="ms-3 ms-sm-4">
                <p className="mb-0">{removeWidows(whatsapp.text)}</p>
              </a>
            </Link>
          </div>
        )}
      </div>
      {button && (
        <button
          className="btn btn-primary btn-darkgreen mt-4"
          onClick={() => saveBtnOnClick()}
        >
          {removeWidows(button.text)}
        </button>
      )}
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </Root>
  );
};

const Root = styled.div`
  background: var(--bs-white);
  box-shadow: 0px 4px 48px 0px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  margin-top: 3rem;
  border-radius: 0.5rem 2rem;

  @media ${media.sm} {
    padding: 3rem;
    border-radius: 0.5rem 3rem;
  }

  @media ${media.lg} {
    padding: 3rem;
    border-radius: 1rem 5rem;
    margin-top: 0;
  }
`;
