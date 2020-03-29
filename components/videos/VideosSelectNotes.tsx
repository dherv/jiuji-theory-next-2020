import { INote } from "../../interfaces/interfaces";
import { FC, useState } from "react";
import { SCVideosSelectNotes as SC } from "./VideosSelectNotes.styled";

const VideosSelectNotes: FC<{
  notes: INote[];
  videoTitle: string;
  saveVideoWithNotes: (notes: INote[]) => void;
}> = ({ notes, videoTitle, saveVideoWithNotes }) => {
  const [selectedNotes, setSelectNotes] = useState<INote[]>([]);

  const addToSelection = event => {
    const options = event.target.options;
    let selection = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selection.push(options[i].value);
      }
    }
    const selectedNotes = selection.map(id =>
      notes.find(n => n.id === Number(id))
    );
    setSelectNotes(selectedNotes);
  };

  return (
    <SC.Container>
      <SC.VideoTitle> {videoTitle} </SC.VideoTitle>
      <SC.Label htmlFor="selectVideoNotes">Choose related notes:</SC.Label>
      <SC.Select id="selectVideoNotes" onChange={addToSelection} multiple>
        {notes.map(note => (
          <option key={note.id} value={note.id}>
            {note.name}
          </option>
        ))}
      </SC.Select>
      <button onClick={() => saveVideoWithNotes(selectedNotes)}>save</button>
    </SC.Container>
  );
};

export default VideosSelectNotes;
