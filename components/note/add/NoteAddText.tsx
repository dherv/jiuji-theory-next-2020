import { FC, ChangeEvent, KeyboardEvent } from "react";
import { INoteInput } from "../../../interfaces/categories";

const NoteAddText: FC<{
  inputs: INoteInput[];
  handleChange: (event: ChangeEvent) => void;
  handlePressEnter: (event: KeyboardEvent) => void;
}> = ({ inputs, handleChange, handlePressEnter }) => {
  return (
    <ul>
      {inputs.map(i => (
        <li key={i.label}>
          <label htmlFor={String(i.label)}>{i.label} -</label>
          <input
            id={String(i.label)}
            type="text"
            name={String(i.label)}
            value={i.value}
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
