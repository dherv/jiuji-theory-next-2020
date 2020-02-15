import { useState } from "react";

interface INoteInput {
  label: number;
  value: string;
}

const NoteAddText = () => {
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
  return (
    <>
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
    </>
  );
};
export default NoteAddText;
