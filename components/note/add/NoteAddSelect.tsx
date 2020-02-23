import { FC } from "react";
import { INoteAddSelect } from "./NoteAddSelect.interface";

const NoteAddSelect: FC<INoteAddSelect> = ({
  options,
  optionsType,
  handleSelect
}) => {
  return options && options.length ? (
    <>
      <label htmlFor={optionsType}>{optionsType}</label>
      <select
        id={optionsType}
        onChange={event => handleSelect(event.target.value, optionsType)}
      >
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  ) : null;
};

export default NoteAddSelect;
