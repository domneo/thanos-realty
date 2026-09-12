import Link from "next/link";
import { useEffect, useState } from "react";
import { removeWidows as stringRemoveWidows } from "string-remove-widows";
import styled from "styled-components";

import { useViewportSize } from "hooks/useViewportSize";
import media from "styles/media";

import NavDropdownIcon from "components/icons/NavDropdownIcon";

interface ButtonMenuItemProps {
  mode: "light" | "dark";
  title: string;
  children?: { id: string; title: string; link: string }[];
}

const ButtonMenuItem = ({ mode, title, children }: ButtonMenuItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine if dropdown will be shown on hover
  // Fixes conflict between onClick and onMouseEnter
  const { width } = useViewportSize();
  const [isHoverable, setIsHoverable] = useState(false);
  useEffect(() => {
    if (width) setIsHoverable(width > 1200);
  }, [width]);

  return (
    <Root
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={() => {
        if (isHoverable) setIsExpanded(true);
      }}
      onMouseLeave={() => {
        if (isHoverable) setIsExpanded(false);
      }}
      className="position-relative d-flex flex-column justify-content-center flex-xl-row align-items-xl-center"
    >
      <MenuItem
        aria-expanded={isExpanded}
        className={`mode-${mode} ${
          isExpanded ? "is-expanded" : ""
        } d-flex align-items-center justify-content-between text-decoration-none text-uppercase text-center`}
      >
        {
          stringRemoveWidows(title, {
            convertEntities: false,
            minWordCount: 3,
          }).res
        }
        <DropdownIcon
          className={`d-xl-none ${isExpanded ? "is-expanded" : ""}`}
        >
          <NavDropdownIcon />
        </DropdownIcon>
      </MenuItem>
      {children?.length && children?.length > 0 && (
        <SubmenuPosition aria-hidden={!isExpanded}>
          <Submenu className="list-unstyled bg-white p-4 mb-0">
            {children.map((childItem) => {
              return (
                <li key={childItem.id}>
                  <Link href={childItem.link} passHref>
                    <MenuLink className="d-flex text-nowrap text-black px-3 py-2">
                      {childItem.title}
                    </MenuLink>
                  </Link>
                </li>
              );
            })}
          </Submenu>
        </SubmenuPosition>
      )}
    </Root>
  );
};

const Root = styled.div`
  border-bottom: 1px solid var(--bs-gray-300);
  overflow: hidden;

  @media ${media.xl} {
    border: none;
    overflow: visible;
  }
`;

const MenuItem = styled.button`
  background: transparent;
  width: 100%;
  padding: 2.5rem;
  border: none;
  letter-spacing: 0.09px;

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

  &.is-expanded {
    padding-bottom: 0.5rem;
  }

  @media ${media.xl} {
    width: auto;
    padding: 0.25rem 0;
    margin: 0 1rem;
    transition: 0.3s all;

    &:hover,
    &:focus {
      transition: 0.3s all;
    }

    &.mode-light {
      &:hover,
      &:focus,
      &.is-expanded {
        box-shadow: 0 3px 0 0 var(--bs-primary);
      }
    }

    &.mode-dark {
      &:hover,
      &:focus,
      &.is-expanded {
        box-shadow: 0 3px 0 0 var(--bs-white);
      }
    }

    &.is-expanded {
      padding-bottom: 0.25rem;
    }
  }
`;

const DropdownIcon = styled.div`
  transform: rotateZ(0deg);
  transition: 0.3s all;

  &.is-expanded {
    transform: rotateX(180deg);
    transition: 0.3s all;
  }
`;

const SubmenuPosition = styled.div`
  position: relative;
  visibility: hidden;
  height: 0;
  opacity: 0;
  transform: translateY(-10%);
  transition: 0.3s all;

  &[aria-hidden="false"] {
    visibility: visible;
    height: auto;
    opacity: 1;
    transform: translateY(0);
    transition: 0.3s all;
  }

  @media ${media.xl} {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-10%) scale(0.8);

    &[aria-hidden="false"] {
      visibility: visible;
      height: auto;
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
    }
  }
`;

const Submenu = styled.ul`
  @media ${media.xl} {
    box-shadow: 0px 0.25rem 3rem -0.5rem rgba(0, 0, 0, 0.08);
  }
`;

const MenuLink = styled.a`
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export default ButtonMenuItem;
