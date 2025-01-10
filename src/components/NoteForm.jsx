import React from "react";
import db from "../appwrite/databases";
import { ID } from "appwrite";
import Note from "./Note";

function NoteForm({ setNotes }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const noteBody = event.target.body.value;
    if (noteBody === "" || noteBody.length < 3) return;

    const temporaryNote = {
      $id: ID.unique(),
      completed: false,
      body: noteBody,
    };

    setNotes((prevState) => [temporaryNote, ...prevState]);

    try {
      const payload = { body: noteBody };
      const response = await db.notes.create(payload);

      setNotes((prevState) => [response, ...prevState]);

      event.target.reset();
    } catch (error) {
      console.error(error);
      alert(
        `Uh oh, sorry! We encountered an issue while creating note. Here's the body you provided: ${noteBody}`
      );
    } finally {
      // we want to remove the temporary note now, regardless of the success value
      setNotes((prevState) =>
        prevState.filter((n) => n.$id != temporaryNote.$id)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} id="notes-form">
      <input type="text" name="body" placeholder="🤔 What's on the agenda?" />
    </form>
  );
}

export default NoteForm;
