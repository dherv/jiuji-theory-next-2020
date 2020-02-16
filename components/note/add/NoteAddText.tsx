import { FC, ChangeEvent, KeyboardEvent } from "react";
import { INoteInput } from "../../../interfaces/interfaces";
import { SCNoteAddText as SC } from "./NoteAddText.styled";

const NoteAddText: FC<{
  inputs: INoteInput[];
  handleChange: (event: ChangeEvent) => void;
  handlePressEnter: (event: KeyboardEvent) => void;
}> = ({ inputs, handleChange, handlePressEnter }) => {
  return (
    <SC.List>
      {inputs.map(i => (
        <SC.ListItem key={i.orderNumber}>
          <SC.Label htmlFor={String(i.orderNumber)}>
            <SC.LabelNumber>{i.orderNumber}</SC.LabelNumber>
            <SC.LabelHyphen> -</SC.LabelHyphen>
          </SC.Label>
          <input
            id={String(i.orderNumber)}
            type="text"
            name={String(i.orderNumber)}
            value={i.text}
            autoFocus
            onChange={event => handleChange(event)}
            onKeyDown={event => handlePressEnter(event)}
          ></input>
        </SC.ListItem>
      ))}
    </SC.List>
  );
};

export default NoteAddText;
