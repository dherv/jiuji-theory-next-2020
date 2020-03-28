import { FC, useState, MouseEvent } from "react";

const VideosSearchForm: FC<{
  onSearch: (event: MouseEvent<HTMLButtonElement>, query: string) => void;
}> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>("");

  const handleChange = ({ target }) => {
    setSearchText(target.value);
  };
  return (
    <form>
      <label htmlFor="searchInput">search BJJ videos</label>
      <input
        id="searchInput"
        placeholder="search"
        onChange={event => handleChange(event)}
      />
      <button onClick={event => onSearch(event, searchText)}>search</button>
    </form>
  );
};

export default VideosSearchForm;
