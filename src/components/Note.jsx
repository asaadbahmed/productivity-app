import { useState } from "react";
import db from "../appwrite/databases";
import DeleteIcon from "../assets/DeleteIcon";

function Note({ setNotes, setProgress, noteData, numberOfNotes }) {
  const [note, setNote] = useState(noteData);
  const handleUpdate = async () => {
    const completed = !note.completed;
    db.notes.update(note.$id, { completed });
    setNote({ ...note, completed: completed });
    /*
    lets say numberOfNotes is 6
    lets say prevState is 0.5
    then that means [(6 * 0.5) = 3] notes are completed
    that means if we complete a note, we should increment the progress by 1/6 or 1/numberOfNotes
    */
    setProgress((prevState) =>
      completed ? prevState + 1 / numberOfNotes : prevState - 1 / numberOfNotes
    );
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
