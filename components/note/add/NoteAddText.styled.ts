import styled from "styled-components";

export const SCNoteAddText = {
  List: styled.ul`
    margin: 2rem 0;
  `,
  ListItem: styled.li`
    display: flex;
    align-items: center;
    margin: 1rem 0;
    width: 100%;
    input {
      width: 100%;
    }
  `,
  Label: styled.label`
    display: flex;
    align-items: center;
  `,
  LabelNumber: styled.span`
    display: block;
    width: 8px;
  `,
  LabelHyphen: styled.span`
    display: block;
    margin: 0 1rem;
  `
};
