import React from "react";
import styled from "styled-components";

import media from "styles/media";

import { MenuIcon } from "./MenuIcon";

interface MenuToggleProps {
  mode: "light" | "dark";
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export const MenuToggle = ({
  mode,
  menuOpen,
  setMenuOpen,
}: MenuToggleProps) => {
  return (
    <Root className="d-flex d-xl-none" onClick={() => setMenuOpen(!menuOpen)}>
      <MenuIcon mode={mode} menuOpen={menuOpen} />
    </Root>
  );
};

const Root = styled.button`
  border: none;
  background: transparent;
  width: 1.5rem;
  padding: 0;
  margin: 0;

  @media ${media.sm} {
    width: 2.25rem;
    margin-right: 2.25rem;
  }

  @media ${media.md} {
    margin-right: 5.25rem;
  }
`;
