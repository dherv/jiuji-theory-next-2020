import styled from "styled-components";

export const SCNav = {
  Nav: styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
  `,

  Title: styled.h1`
    max-width: 5ch;
    font-family: var(--title-font);
    font-size: 4rem;
  `,

  ListItem: styled.li`
    display: inline-block;
    margin: 0 1rem;
  `,

  Link: styled.a`
    font-family: var(--second-font);
    font-size: 1.25rem;
    cursor: pointer;
  `
};
