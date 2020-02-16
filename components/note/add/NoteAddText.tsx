import { FC, ChangeEvent, KeyboardEvent } from "react";
import { INoteInput } from "../../../interfaces/interfaces";

const NoteAddText: FC<{
  inputs: INoteInput[];
  handleChange: (event: ChangeEvent) => void;
  handlePressEnter: (event: KeyboardEvent) => void;
}> = ({ inputs, handleChange, handlePressEnter }) => {
  return (
    <ul>
      {inputs.map(i => (
        <li key={i.orderNumber}>
          <label htmlFor={String(i.orderNumber)}>{i.orderNumber} -</label>
          <input
            id={String(i.orderNumber)}
            type="text"
            name={String(i.orderNumber)}
            value={i.text}
            autoFocus
            onChange={event => handleChange(event)}
            onKeyDown={event => handlePressEnter(event)}
          ></input>
        </li>
      ))}
    </ul>
  );
};
export default NoteAddText;
