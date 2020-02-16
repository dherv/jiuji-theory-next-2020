import React, { useState } from "react";
import NoteAddSelect from "./NoteAddSelect";
import NoteAddText from "./NoteAddText";
import {
  INoteInput,
  ICategory,
  IPosition,
  ITeacher,
  ITechnique
} from "../../../interfaces/interfaces";
import NoteAddButton from "./NoteAddButton";

const NoteAdd = () => {
  const initialInput = { orderNumber: 1, text: "" };
  const [inputs, setInputs] = useState<INoteInput[]>([initialInput]);
  const [count, setCount] = useState<number>(1);
  const [category, setCategory] = useState<ICategory>();
  const [position, setPosition] = useState<IPosition>();
  const [teacher, setTeacher] = useState<ITeacher>();
  const [technique, setTechnique] = useState<ITechnique>();

  const handleChange = event => {
    const index = inputs.findIndex(
      i => String(i.orderNumber) === event.target.name
    );
    const copyInputs = [...inputs].map(a => ({ ...a }));

    const inputToUpdate = copyInputs[index];
    inputToUpdate.text = event.target.value;

    const updatedInputs = [...copyInputs];

    setInputs(updatedInputs);
  };

  const handlePressEnter = event => {
    if (event.keyCode === 13) {
      // prevent submitting the form by pressing enter
      event.preventDefault();
    }
    if (
      event.keyCode === 13 &&
      event.target.name === String(inputs[inputs.length - 1].orderNumber) &&
      event.target.value
    ) {
      // update count
      const newCount = count + 1;

      // add new input with new count
      const copyInputs = [...inputs].map(a => ({ ...a }));
      const newInput = {
        orderNumber: newCount,
        text: ""
      };
      const updatedInputs = [...copyInputs, newInput];
      setCount(newCount);
      setInputs(updatedInputs);
    }
  };

  const handleSelect = (event, optionsType) => {
    const optionsMap = new Map([
      ["categories", id => setCategory(id)],
      ["positions", id => setPosition(id)],
      ["teachers", id => setTeacher(id)],
      ["techniques", id => setTechnique(id)]
    ]);

    optionsMap.get(optionsType)(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    //api call
    const note = {
      name: name,
      categoryId: category,
      positionId: position,
      teacherId: teacher,
      techniqueId: technique,
      noteItems: inputs.filter(i => i.text)
    };
    // clear all inputs
    setInputs([initialInput]);
  };
  return (
    <form>
      <input placeholder="name" type="text"></input>
      <NoteAddSelect
        optionsType="categories"
        handleSelect={handleSelect}
      ></NoteAddSelect>
      <NoteAddSelect
        optionsType="positions"
        handleSelect={handleSelect}
      ></NoteAddSelect>
      <NoteAddSelect
        optionsType="techniques"
        handleSelect={handleSelect}
      ></NoteAddSelect>
      <NoteAddSelect
        optionsType="teachers"
        handleSelect={handleSelect}
      ></NoteAddSelect>
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
