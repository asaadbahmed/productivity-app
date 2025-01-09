import { useState } from "react";
import db from "../appwrite/databases";
import DeleteIcon from "../assets/DeleteIcon";

function Note({ setNotes, noteData }) {
  const [note, setNote] = useState(noteData);
  const handleUpdate = async () => {
    const completed = !note.completed;
    const updatedNote = { ...note, completed: completed };

    db.notes.update(note.$id, { completed });
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
