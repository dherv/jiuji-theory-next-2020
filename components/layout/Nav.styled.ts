import styled from "styled-components";

export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTitle = styled.h1`
  max-width: 5ch;
  font-family: var(--title-font);
  font-size: 4rem;
`;

export const StyledListItem = styled.li`
  display: inline-block;
  margin: 0 1rem;
`;

export const StyledLink = styled.a`
  font-size: 1.25rem;
  cursor: pointer;
`;
