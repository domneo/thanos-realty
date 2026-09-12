import { useState } from "react";
import { removeWidows as stringRemoveWidows } from "string-remove-widows";
import styled from "styled-components";

import media from "styles/media";

import { ConnectWithUsModal } from "./Modal";

interface ConnectWithUsMenuItemProps {
  mode: "light" | "dark";
  title: string;
}

const ConnectWithUsMenuItem = ({ mode, title }: ConnectWithUsMenuItemProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="position-relative">
      <MenuItem
        onClick={() => setShowModal(true)}
        className={`mode-${mode} d-flex align-items-center text-decoration-none text-uppercase h-100`}
      >
        {
          stringRemoveWidows(title, {
            convertEntities: false,
            minWordCount: 3,
          }).res
        }
      </MenuItem>
      <ConnectWithUsModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

const MenuItem = styled.button`
  width: 100%;
  padding: 2.5rem;
  border: none;
  letter-spacing: 0.09px;
  transition: 0.3s box-shadow, 0.3s color, 0.3s background, 0.3s border;

  &.mode-light {
    color: var(--bs-primary);
    border-color: 1px solid var(--bs-primary);
    background: transparent;
    &:hover,
    &:focus {
      color: var(--bs-white);
      background: var(--bs-primary);
    }
  }

  &.mode-dark {
    color: var(--bs-white);
    border-color: 1px solid var(--bs-white);
    background: transparent;
    &:hover,
    &:focus {
      color: var(--bs-primary);
      background: var(--bs-white);
    }
  }

  @media ${media.xl} {
    width: auto;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    border-radius: 0.125rem;
  }
`;

export default ConnectWithUsMenuItem;
