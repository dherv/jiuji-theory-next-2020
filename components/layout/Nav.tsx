import { FC } from "react";
import Link from "next/link";
import {
  StyledLink,
  StyledListItem,
  StyledNav,
  StyledTitle
} from "./Nav.styled";

const Nav: FC<{}> = () => (
  <StyledNav>
    <StyledTitle>jiuji theory</StyledTitle>
    <ul>
      <StyledListItem>
        <Link href="/about">
          <StyledLink>videos</StyledLink>
        </Link>
      </StyledListItem>
      <StyledListItem>
        <Link href="/about">
          <StyledLink>account</StyledLink>
        </Link>
      </StyledListItem>
    </ul>
  </StyledNav>
);

export default Nav;
