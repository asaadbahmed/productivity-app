import { useState } from "react";
import db from "../appwrite/databases";
import DeleteIcon from "../assets/DeleteIcon";

function Note({ setNotes, setProgress, noteData, noteCount }) {
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
        return [...filteredNotes, note];
      });
    } else {
      setNotes((prevState) => {
        const filteredNotes = prevState.filter((n) => n.$id != note.$id);
        return [note, ...filteredNotes];
      });
    }

    setNote({ ...note, completed: completed });
    setProgress((prevState) =>
      completed ? prevState + 1 / noteCount : prevState - 1 / noteCount
    );
  };

  const handleDelete = async () => {
    /* deletion effect goes here wooo */
    const completed = note.completed;
    db.notes.delete(note.$id);

    setProgress((prevState) => {
      if (noteCount == 0) return 0;
      return completed ? (prevState - 1) / noteCount : prevState / noteCount;
    });
    setNotes((prevState) =>
      prevState.filter((index) => index.$id !== note.$id)
    );
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
