import React from "react";
import NoteAddSelect from "./NoteAddSelect";
import NoteAddText from "./NoteAddText";

const NoteAdd = () => (
  <form>
    <input placeholder="name" type="text"></input>
    <NoteAddSelect optionsType="categories"></NoteAddSelect>
    <NoteAddSelect optionsType="positions"></NoteAddSelect>
    <NoteAddSelect optionsType="techniques"></NoteAddSelect>
    <NoteAddSelect optionsType="teachers"></NoteAddSelect>
    <NoteAddText></NoteAddText>
  </form>
);

export default NoteAdd;
