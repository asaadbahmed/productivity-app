import React from "react";
import db from "../appwrite/databases";
import { ID } from "appwrite";

import DangerAlert from "./DangerAlert";
import RetryIcon from "../assets/RetryIcon";

function NoteForm({ setNotes, setAlert, alert }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const noteBody = event.target.body.value;
    if (noteBody === "" || noteBody.length < 3) return;

    const temporaryNote = {
      $id: ID.unique(),
      completed: false,
      body: noteBody,
    };

    const retry = async () => {
      try {
        const payload = { body: noteBody, dateCreated: new Date() };
        const response = await db.notes.create(payload);

        setNotes((prevState) => [response, ...prevState]);

        event.target.reset();
      } catch (error) {
        console.error(error);
        setAlert(
          <DangerAlert
            title="An error occurred!"
            body={
              <>
                Uh oh, we're sorry! We encountered an issue while creating note.
                Contact us at nosupport@fakemail.com if this issue persists.
                Here's the text you provided.
                <br />
                <br />
                {noteBody}
              </>
            }
            option1="Retry"
            option1icon={<RetryIcon viewBox="5 0 20 20" />}
            option1action={retry}
            option2={"Dismiss"}
            option2action={() => setAlert(null)}
          />
        );
      } finally {
        // we want to remove the temporary note now, regardless of the success value
        setNotes((prevState) =>
          prevState.filter((n) => n.$id != temporaryNote.$id)
        );
      }
    };

    setNotes((prevState) => [temporaryNote, ...prevState]);
    retry();
  };

  return (
    <form onSubmit={handleSubmit} id="notes-form">
      <>
        {alert !== null ? (
          alert
        ) : (
          <input
            type="text"
            name="body"
            placeholder="🤔 What's on the agenda?"
          />
        )}
      </>
    </form>
  );
}

export default NoteForm;
