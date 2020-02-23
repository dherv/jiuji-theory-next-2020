import { FormEvent } from "react";
type OptionTypes = "categories" | "positions" | "techniques" | "teachers";
export interface INoteAddSelect {
  options: any;
  optionsType: OptionTypes;
  handleSelect: (value: string, optionsType: OptionTypes) => void;
}
