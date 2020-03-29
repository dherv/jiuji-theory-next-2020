import styled from "styled-components";

export const SCVideosSelectNotes = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 600px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `,
  Select: styled.select`
    border: none;
    margin: 1rem;
    outline: none;
    height: 100%;
  `,
  VideoTitle: styled.h4`
    font-weight: 600;
    margin: 1rem;
  `,
  Label: styled.label`
    font-weight: 600;
    margin: 1rem;
  `
};
