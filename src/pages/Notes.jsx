import { useEffect, useState } from "react";
import { Query } from "appwrite";
import db from "../appwrite/databases";

import NoteForm from "../components/NoteForm";
import Note from "../components/Note";

function Notes() {
  const [notes, setNotes] = useState([]);
  const init = async () => {
    const response = await db.notes.list([Query.orderDesc("$createdAt")]);
    setNotes(response.documents);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div>
        <h1>✍️ My Notes</h1>
      </div>
      <NoteForm setNotes={setNotes} />
      <div>
        {notes.map((note) => (
          <Note key={note.$id} noteData={note} setNotes={setNotes} />
        ))}
      </div>
    </>
  );
}

export default Notes;
