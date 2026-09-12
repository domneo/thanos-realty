import Link from "next/link";
import { removeWidows as stringRemoveWidows } from "string-remove-widows";
import styled from "styled-components";

import media from "styles/media";

interface LinkMenuItemProps {
  mode: "light" | "dark";
  title: string;
  link: string;
}

const LinkMenuItem = ({ mode, title, link }: LinkMenuItemProps) => {
  return (
    <Root className="position-relative d-flex align-items-center">
      <Link href={link} passHref>
        <MenuItem
          className={`mode-${mode} d-flex align-items-center text-decoration-none text-uppercase text-center`}
        >
          {
            stringRemoveWidows(title, {
              convertEntities: false,
              minWordCount: 3,
            }).res
          }
        </MenuItem>
      </Link>
    </Root>
  );
};

const Root = styled.div`
  border-bottom: 1px solid var(--bs-gray-300);

  @media ${media.xl} {
    border: none;
  }
`;

const MenuItem = styled.a`
  background: transparent;
  width: 100%;
  padding: 2.5rem;
  letter-spacing: 0.09px;
  transition: 0.3s box-shadow, 0.3s color;

  &.mode-light {
    color: var(--bs-primary);
    &:hover,
    &:focus {
      box-shadow: 0 3px 0 0 var(--bs-primary);
    }
  }

  &.mode-dark {
    color: var(--bs-white);
    &:hover,
    &:focus {
      box-shadow: 0 3px 0 0 var(--bs-white);
    }
  }

  @media ${media.xl} {
    width: auto;
    padding: 0.25rem 0;
    margin: 0 1rem;
  }
`;

export default LinkMenuItem;
