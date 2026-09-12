import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

import useScrollPosition from "hooks/useScrollPosition";
import media from "styles/media";

import Menu from "./Header/Menu";
import { MenuToggle } from "./Header/MenuToggle";
import SavedListingsMenuItem from "./Header/SavedListingsMenuItem";
import { SearchMenuItem } from "./Header/SearchMenuItem";

export interface MenuItem {
  id: string;
  title: string;
  link?: string;
  children?: {
    id: string;
    title: string;
    link: string;
  }[];
}

interface HeaderProps {
  mode: "light" | "dark";
  menu: MenuItem[];
}

const Header = ({ mode, menu }: HeaderProps) => {
  const scrollPosition = useScrollPosition();
  const scrollThreshold = 200;
  const [headerMode, setHeaderMode] = useState(mode);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Determine light/dark mode
  useEffect(() => {
    setIsScrolledDown(scrollPosition > scrollThreshold);

    const headerMode = () => {
      if (menuOpen) {
        return "light";
      } else {
        return scrollPosition > scrollThreshold ? "light" : mode;
      }
    };
    setHeaderMode(headerMode());
  }, [mode, menuOpen, scrollPosition, scrollThreshold]);

  useEffect(() => {
    const bodyClass = document.body.classList;
    if (menuOpen) {
      bodyClass.add("scroll-lock");
    } else {
      bodyClass.remove("scroll-lock");
    }
  }, [menuOpen]);

  return (
    <Root className="position-sticky top-0 start-0 end-0">
      <NavBar
        className={`mode-${headerMode} ${
          isScrolledDown ? "scrolled-down" : ""
        } ${
          menuOpen ? "menu-open" : ""
        } container-fluid p-3 p-sm-4 py-xl-5 px-xxl-5`}
      >
        <div className="d-flex align-items-center justify-content-between">
          <MenuToggle
            mode={headerMode}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
          <div className="flex-shrink-0">
            <Link href="/">
              <a className="d-block h-100 px-2 px-sm-0 me-xl-4">
                <Logo>
                  <Image
                    src={
                      headerMode === "light"
                        ? `/images/logo-rgb.svg`
                        : `/images/logo-white.svg`
                    }
                    alt="Thanos Realty | Halving Occupancy, Doubling Space"
                    layout="fill"
                    objectFit="contain"
                    objectPosition={"left center"}
                  />
                </Logo>
              </a>
            </Link>
          </div>
          <div className="d-none d-xl-flex flex-grow-1 align-items-center justify-content-end">
            <Menu mode={headerMode} menu={menu} />
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <div className="d-xl-none">
              <SavedListingsMenuItem
                mode={headerMode}
                title={"Saved Listings"}
                link={"/saved-listings"}
              />
            </div>
            <SearchMenuItem mode={headerMode} />
          </div>
        </div>
      </NavBar>
      <MobileMenu
        className={`d-flex d-xl-none position-absolute top-0 start-0 end-0 ${
          menuOpen ? "menu-open" : ""
        }`}
      >
        <Menu mode={headerMode} menu={menu} />
      </MobileMenu>
    </Root>
  );
};

const Root = styled.header`
  z-index: 1000;
  height: 0;
`;

const NavBar = styled.div`
  position: relative;
  z-index: 60;
  transition: 0.3s background, 0.3s box-shadow;

  &.mode-light {
    background: var(--bs-white);
  }

  &.mode-dark {
    background: linear-gradient(
      180deg,
      rgba(35, 35, 35, 0.89) 0%,
      rgba(35, 35, 35, 0) 100%
    );
  }

  &.scrolled-down,
  &.menu-open {
    box-shadow: 0 0.5rem 0.75rem 0 rgba(0, 0, 0, 0.12);
  }
`;

const Logo = styled.div`
  width: 200px;
  height: 21px;
  position: relative;

  @media ${media.sm} {
    width: 240px;
    height: 24px;
  }

  @media ${media.lg} {
    width: 324px;
    height: 32px;
  }
`;

const MobileMenu = styled.div`
  z-index: 50;
  height: 0vh;
  overflow: hidden;
  padding-top: 68px;
  background: transparent;
  transition: 0.3s all;

  &.menu-open {
    height: 100vh;
    overflow-y: scroll;
    background: var(--bs-white);
    transition: 0.3s all;
  }

  @media ${media.sm} {
    padding-top: 86px;
  }

  @media ${media.lg} {
    padding-top: 101px;
  }
`;

export default Header;
