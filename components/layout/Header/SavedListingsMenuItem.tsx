import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { SavedListingsContext } from "components/SavedListingsContext";

import { HeartIcon } from "./HeartIcon";

interface SavedListingsMenuItemProps {
  mode: "light" | "dark";
  title: string;
  link: string;
}

const SavedListingsMenuItem = ({
  mode,
  title,
  link,
}: SavedListingsMenuItemProps) => {
  const [savedCount, setSavedCount] = useState(0);

  const savedListings = useContext(SavedListingsContext);
  useEffect(() => {
    setSavedCount(savedListings.count);
  }, [savedListings.count]);

  return (
    <Root className="position-relative">
      <Link href={link} passHref>
        <MenuItem
          className={`mode-${mode} d-flex align-items-center text-decoration-none text-uppercase me-4 me-xl-2 p-0 p-xl-2 pe-xl-3`}
        >
          <span className="me-1">
            <HeartIcon mode={mode} savedCount={savedCount} />
          </span>
          <Underline className={`mode-${mode} py-1`}>
            <span className="d-none d-xl-inline me-1">{title}</span>(
            {savedCount})
          </Underline>
        </MenuItem>
      </Link>
    </Root>
  );
};

const Root = styled.div`
  display: none;

  @media (min-width: 400px) {
    display: flex;
    align-items: center;
  }
`;

const MenuItem = styled.a`
  background: transparent;
  border: 1px solid transparent;
  border-radius: 0.125rem;
  letter-spacing: 0.09px;
  transition: 0.3s box-shadow, 0.3s color, 0.3s border;
  &:hover,
  &:focus {
    font-weight: bold;
    letter-spacing: 0px;
  }

  &.mode-light {
    color: var(--bs-primary);
  }

  &.mode-dark {
    color: var(--bs-white);
  }
`;

const Underline = styled.span`
  transition: 0.3s box-shadow;

  &.mode-light {
    &:hover,
    &:focus {
      box-shadow: 0 3px 0 0 var(--bs-primary);
    }
  }

  &.mode-dark {
    &:hover,
    &:focus {
      box-shadow: 0 3px 0 0 var(--bs-white);
    }
  }
`;

export default SavedListingsMenuItem;
