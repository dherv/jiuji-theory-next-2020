import styled from "styled-components";

export const SCVideosListSearch = {
  List: styled.ul`
    margin: 2rem 0;
  `,
  ListItem: styled.li`
    margin: 1rem 0;
  `,
  VideoCard: styled.div`
    display: flex;
  `,
  VideoCardContent: styled.div`
    padding: 0 1rem;
    max-width: calc(50% - 320px);
  `,
  VideoCardTitle: styled.h5`
    margin: 0.25rem 0 1rem;
    font-size: 1.25rem;
    font-weight: bold;
  `
};
