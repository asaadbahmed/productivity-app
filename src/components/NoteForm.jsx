import React from "react";
import db from "../appwrite/databases";

function NoteForm({ setNotes }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const noteBody = event.target.body.value;
    if (noteBody === "" || noteBody.length < 3) return;

    try {
      const payload = { body: noteBody };
      const response = await db.notes.create(payload);

      setNotes((prevState) => [response, ...prevState]);
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