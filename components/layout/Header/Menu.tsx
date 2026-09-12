import styled from "styled-components";

import media from "styles/media";

import { MenuItem } from "../Header";
import ButtonMenuItem from "./ButtonMenuItem";
import ConnectWithUsMenuItem from "./ConnectWithUs/MenuItem";
import LinkMenuItem from "./LinkMenuItem";
import SavedListingsMenuItem from "./SavedListingsMenuItem";

interface MenuProps {
  menu: MenuItem[];
  mode: "light" | "dark";
}

const Menu = ({ menu, mode }: MenuProps) => (
  <Root>
    <div className="list-unstyled m-0 p-0 d-flex flex-column flex-xl-row">
      {menu.map((menuItem) => {
        if (menuItem.link) {
          return (
            <LinkMenuItem
              mode={mode}
              key={menuItem.id}
              title={menuItem.title}
              link={menuItem.link}
            />
          );
        } else {
          return (
            <ButtonMenuItem
              mode={mode}
              key={menuItem.id}
              title={menuItem.title}
            >
              {menuItem.children}
            </ButtonMenuItem>
          );
        }
      })}
      <div className="d-xl-none mb-5">
        <LinkMenuItem
          mode={mode}
          // TODO: add saved number fetched from api
          title={"Saved Listings"}
          link={"/saved-listings"}
        />
        <ConnectWithUsMenuItem mode={mode} title={"Connect With Us"} />
      </div>
      <div className="d-none d-xl-flex">
        <SavedListingsMenuItem
          mode={mode}
          title={"Saved Listings"}
          link={"/saved-listings"}
        />
        <ConnectWithUsMenuItem mode={mode} title={"Connect With Us"} />
      </div>
    </div>
  </Root>
);

const Root = styled.nav`
  width: 100%;

  @media ${media.xl} {
    width: auto;
  }
`;

export default Menu;
