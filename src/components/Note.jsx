import { useState } from "react";
import db from "../appwrite/databases";
import DeleteIcon from "../assets/DeleteIcon";

function Note({ setNotes, setProgress, noteData }) {
  const [note, setNote] = useState(noteData);
  const handleUpdate = async () => {
    const completed = !note.completed;

    db.notes.update(note.$id, { completed });

    /*
    if the note was completed, move it to the bottom
    if the note was uncompleted, move it to the top
    */
    if (completed) {
      setNotes((prevState) => {
        const filteredNotes = prevState.filter((n) => n.$id != note.$id);
        const progress =
          filteredNotes.filter((n) => n.completed).length + (completed ? 1 : 0);
        setProgress(progress / (filteredNotes.length + 1));
        return [...filteredNotes, note];
      });
    } else {
      setNotes((prevState) => {
        const filteredNotes = prevState.filter((n) => n.$id != note.$id);
        const progress =
          filteredNotes.filter((n) => n.completed).length + (completed ? 1 : 0);
        setProgress(progress / (filteredNotes.length + 1));
        return [note, ...filteredNotes];
      });
    }

    setNote({ ...note, completed: completed });
  };

  const handleDelete = async () => {
    /* deletion effect goes here wooo */
    const completed = note.completed;
    db.notes.delete(note.$id);

    setNotes((prevState) => {
      const otherNotes = prevState.filter(n.$id != note.$id);
      const otherCompletedNotes = otherNotes.filter(n.completed);      
      setProgress(otherCompletedNotes / otherNotes);
      return prevState.filter((index) => index.$id !== note.$id);
    });
  };

  return (
    <div className="note-wrapper">
      <span className="note-body" onClick={handleUpdate}>
        {note.completed ? (
          <s>
            <b>{note.body}</b>
          </s>
        ) : (
          <b>{note.body}</b>
        )}
      </span>
      <div className="delete" onClick={handleDelete}>
        <DeleteIcon />
      </div>
    </div>
  );
}

export default Note;
