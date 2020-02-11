import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";

export const Nav: FC<{}> = () => (
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

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
`;

const StyledTitle = styled.h1`
  font-family: var(--title-font);
  font-size: 4rem;
  word-wrap: break-word;
`;

const StyledListItem = styled.li`
  display: inline-block;
  margin: 0 1rem;
`;

const StyledLink = styled.a`
  font-size: 1.25rem;
  cursor: pointer;
`;
