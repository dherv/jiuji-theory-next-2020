import styled from "styled-components";

export const SCVideosList = {
  List: styled.ul`
    display: flex;
    flex-wrap: wrap;
    padding: 2rem 0;
  `,
  ListItem: styled.li`
    margin-right: 2rem;
    margin-bottom: 4rem;
  `,
  VideoCard: styled.div`
    width: 320px;
  `,
  VideoCardContent: styled.div``,
  VideoCardTitle: styled.h5`
    font-size: 14px;
    font-weight: bold;
  `
};
