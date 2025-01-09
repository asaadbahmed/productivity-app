import React from "react";
import db from "../appwrite/databases";

function NoteForm({ setNotes, setProgress, noteCount }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const noteBody = event.target.body.value;
    if (noteBody === "" || noteBody.length < 3) return;

    try {
      const payload = { body: noteBody };
      const response = await db.notes.create(payload);

      setNotes((prevState) => [response, ...prevState]);
      setProgress((prevState) => prevState / (noteCount + 1));

      event.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="notes-form">
      <input type="text" name="body" placeholder="🤔 What's on the agenda?" />
    </form>
  );
}

export default NoteForm;
