import styled from "styled-components";

export const SCNoteList = {
  List: styled.ul`
    min-width: 400px;
    max-width: 600px;
    margin: 0 4rem;
  `,
  ListItem: styled.li`
    padding: 1rem 0;
    border-top: 1px solid #212121;
  `,
  ListItemHeader: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  ListItemHeaderSub: styled.div`
    display: flex;
    margin-top: 0.5rem;
  `,
  ListItemTitle: styled.li`
    margin-top: 0.5rem;
    font-weight: 600;
  `
};
