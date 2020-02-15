import React, { useState } from "react";
import NoteAddSelect from "./NoteAddSelect";
import NoteAddText from "./NoteAddText";
import { INoteInput } from "../../../interfaces/categories";
import NoteAddButton from "./NoteAddButton";

const NoteAdd = () => {
  const [inputs, setInputs] = useState<INoteInput[]>([{ label: 1, value: "" }]);
  const [count, setCount] = useState<number>(1);

  const handleChange = event => {
    const index = inputs.findIndex(i => String(i.label) === event.target.name);
    const copyInputs = [...inputs].map(a => ({ ...a }));

    const inputToUpdate = copyInputs[index];
    inputToUpdate.value = event.target.value;

    const updatedInputs = [...copyInputs];

    setInputs(updatedInputs);
  };

  const handlePressEnter = event => {
    if (
      event.keyCode === 13 &&
      event.target.name === String(inputs[inputs.length - 1].label) &&
      event.target.value
    ) {
      // prevent submitting the form by pressing enter
      event.preventDefault();
      // update count
      const newCount = count + 1;

      // add new input with new count
      const copyInputs = [...inputs].map(a => ({ ...a }));
      const newInput = {
        label: newCount,
        value: ""
      };
      const updatedInputs = [...copyInputs, newInput];
      setCount(newCount);
      setInputs(updatedInputs);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
  };
  return (
    <form>
      <input placeholder="name" type="text"></input>
      <NoteAddSelect optionsType="categories"></NoteAddSelect>
      <NoteAddSelect optionsType="positions"></NoteAddSelect>
      <NoteAddSelect optionsType="techniques"></NoteAddSelect>
      <NoteAddSelect optionsType="teachers"></NoteAddSelect>
      <NoteAddText
        inputs={inputs}
        handleChange={handleChange}
        handlePressEnter={handlePressEnter}
      ></NoteAddText>
      <NoteAddButton handleSubmit={handleSubmit}></NoteAddButton>
    </form>
  );
};

export default NoteAdd;
