import { FC } from "react";
import { INoteItem } from "../../../interfaces/interfaces";
import { SCNoteListItems as SC } from "./NoteListItems.styled";

const NoteListItems: FC<{ noteItems: INoteItem[] }> = ({ noteItems }) => (
  <SC.List>
    {noteItems.map(ni => (
      <li key={ni.id}>
        {ni.orderNumber} - {ni.text}
      </li>
    ))}
  </SC.List>
);

export default NoteListItems;
