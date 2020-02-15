import { useState, FC, useEffect } from "react";
import { INoteAddSelect } from "./NoteAddSelect.interface";
import Api from "../../../api/Api";
import { ICategories } from "../../../interfaces/categories";

const NoteAddSelect: FC<INoteAddSelect> = ({ optionsType }) => {
  const [options, setOptions] = useState<ICategories[]>();
  const [loaded, setLoaded] = useState<boolean>(false);

  const fetchOptions = async () => {
    await Api.get(`/${optionsType}`)
      .then(response => setOptions(response))
      .catch(error => console.error(error));
    setLoaded(true);
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    loaded && (
      <select>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    )
  );
};

export default NoteAddSelect;
