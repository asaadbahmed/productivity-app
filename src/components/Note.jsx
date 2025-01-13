import { useState } from "react";
import db from "../appwrite/databases";
import DeleteIcon from "../assets/DeleteIcon";

function Note({ setNotes, noteData }) {
  const [note, setNote] = useState(noteData);
  const handleComplete = async () => {
    const completed = !note.completed;
    const updatedNote = { ...note, completed };

    db.notes.update(note.$id, { completed, dateCompleted: new Date() });
    setNote(updatedNote);

    /*
    if the note was completed, move it to the bottom
    if the note was uncompleted, move it to the top
    */
    if (completed) {
      setNotes((prevState) => {
        const filteredNotes = prevState.filter((n) => n.$id !== note.$id);
        return [...filteredNotes, updatedNote];
      });
    } else {
      setNotes((prevState) => {
        const filteredNotes = prevState.filter((n) => n.$id != note.$id);
        return [updatedNote, ...filteredNotes];
      });
    }
  };

  const handleDelete = async () => {
    /* deletion effect goes here wooo */
    db.notes.delete(note.$id);
    setNotes((prevState) =>
      prevState.filter((index) => index.$id !== note.$id)
    );
  };

  const handleStar = async () => {
    /* star effect goes here wooo */
    const starred = !note.starred;
    const updatedNote = { ...note, starred };

    db.notes.update(note.$id, { starred });
    setNote(updatedNote);

    /* if the note was starred, move it to the very top, and if it was unstarred move it to under the last starred note */
  };

  return (
    <div className="note-wrapper">
      <span className="note-body" onClick={handleComplete}>
        {note.completed ? (
          <s>
            <b>{note.title}</b>
          </s>
        ) : (
          <b>{note.title}</b>
        )}
      </span>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="delete" onClick={handleStar}>
          <DeleteIcon />
        </div>
        <div className="delete" onClick={handleDelete}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
}

export default Note;
