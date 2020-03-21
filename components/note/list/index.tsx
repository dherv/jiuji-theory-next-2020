import Api from "../../../api/Api";
import { useEffect, useState } from "react";
import { INote } from "../../../interfaces/interfaces";
import { SCNoteList as SC } from "./index.styled";
import NoteListItems from "./NoteListItems";

const fetchNotes = (setNotes): Promise<INote[]> => {
  return Api.get<INote[]>("/notes")
    .then(notes => setNotes(notes))
    .catch(error => {
      return console.error(error);
    });
};

const NoteList = ({ options }: any) => {
  const [notes, setNotes] = useState<INote[]>([]);
  useEffect(() => {
    fetchNotes(setNotes);
  }, []);

  return (
    <SC.List style={{ padding: "0 2rem" }}>
      {notes.map(n => (
        <SC.ListItem key={n.id}>
          <ul>
            <li>
              <SC.ListItemHeader>
                <div>
                  {options.teachers.find(t => t.id === n.teacherId).name}
                </div>
                <div>{new Date(n.date).toLocaleDateString()}</div>
              </SC.ListItemHeader>
            </li>
            <SC.ListItemHeaderSub>
              <div>
                {options.techniques.find(o => o.id === n.techniqueId).name}
              </div>
              <div>/</div>
              <div>
                {options.positions.find(p => p.id === n.teacherId).name}
              </div>
            </SC.ListItemHeaderSub>
            <SC.ListItemTitle>{n.name}</SC.ListItemTitle>
            <li>
              <NoteListItems noteItems={n.noteItems} />
            </li>
          </ul>
        </SC.ListItem>
      ))}
    </SC.List>
  );
};

export default NoteList;
