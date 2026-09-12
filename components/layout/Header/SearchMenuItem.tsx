import { useEffect, useState } from "react";
import styled from "styled-components";

import media from "styles/media";

import { Search } from "./Search/Search";
import { SearchIcon } from "./SearchIcon";

interface SearchMenuItemProps {
  mode: "light" | "dark";
}

export const SearchMenuItem = ({ mode }: SearchMenuItemProps) => {
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const bodyClass = document.body.classList;
    if (showSearch) {
      bodyClass.add("scroll-lock");
    } else {
      bodyClass.remove("scroll-lock");
    }
  }, [showSearch]);

  return (
    <>
      <Root
        onClick={() => setShowSearch(true)}
        className={`mode-${mode} d-flex align-items-center text-decoration-none text-uppercase h-100 p-0 ms-xl-4`}
      >
        <SearchIcon mode={mode} />
      </Root>
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
};

const Root = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  transform: scale(1);
  transition: 0.3s transform;
  width: 1.5rem;

  @media ${media.sm} {
    width: 2.25rem;
  }
`;
