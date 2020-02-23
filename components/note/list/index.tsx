import Api from "../../../api/Api";
import { useEffect, useState } from "react";
import { INote } from "../../../interfaces/interfaces";

const fetchNotes = () => {
  return Api.get("/notes")
    .then(response => response)
    .catch(error => console.error(error));
};

const NoteList = ({ options }: any) => {
  const [notes, setNotes] = useState<INote[]>([]);
  useEffect(() => {
    fetchNotes().then(notes => {
      setNotes(notes);
    });
  }, []);

  return (
    <ul style={{ padding: "0 2rem" }}>
      {notes.map(n => (
        <li key={n.id}>
          <ul>
            <li>{n.name}</li>
            <li>{new Date(n.createdAt).toLocaleDateString()}</li>
            <li>{options.techniques.find(o => o.id === n.techniqueId).name}</li>
            <li>{options.teachers.find(t => t.id === n.teacherId).name}</li>
            <li>{options.positions.find(p => p.id === n.teacherId).name}</li>
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
