import React from "react";
import db from "../appwrite/databases";
import { ID } from "appwrite";
import Note from "./Note";
import DangerAlert from "./DangerAlert";
import RetryIcon from "../assets/RetryIcon";

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
      <DangerAlert
        title="An error occurred!"
        body={
          <>
            Uh oh, we're sorry! We encountered an issue while creating note.
            Here's the text you provided.
            <br />
            <br />
            {noteBody}
          </>
        }
        option1="Retry"
        option2={"Dismiss"}
        option1icon={<RetryIcon viewBox="5 0 20 20" />}
      />;
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
