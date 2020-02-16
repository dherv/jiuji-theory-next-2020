import { FormEvent } from "react";
type OptionTypes = "categories" | "positions" | "techniques" | "teachers";
export interface INoteAddSelect {
  optionsType: OptionTypes;
  handleSelect: (
    event: FormEvent<HTMLSelectElement>,
    optionsType: OptionTypes
  ) => void;
}
