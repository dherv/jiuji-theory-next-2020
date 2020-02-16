import { useState, FC, useEffect } from "react";
import { INoteAddSelect } from "./NoteAddSelect.interface";
import Api from "../../../api/Api";
import { ICategory } from "../../../interfaces/interfaces";

const NoteAddSelect: FC<INoteAddSelect> = ({ optionsType, handleSelect }) => {
  const [options, setOptions] = useState<ICategory[]>();
  const [loaded, setLoaded] = useState<boolean>(false);

  const fetchOptions = async () => {
    await Api.get(`/${optionsType}`)
      .then(response => {
        setOptions(response);
        handleSelect(response[0].id, optionsType);
      })
      .catch(error => console.error(error));
    setLoaded(true);
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    loaded && (
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
    )
  );
};

export default NoteAddSelect;
