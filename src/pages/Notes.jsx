import { useEffect, useState } from "react";
import { Query } from "appwrite";
import db from "../appwrite/databases";

import ThemeSelector from "../components/ThemeSelector";
import NoteForm from "../components/NoteForm";
import Note from "../components/Note";
import ProgressBar from "../components/ProgressBar";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [progress, setProgress] = useState(0);
  const normalize = (value, min, max) => (value - min) / (max - min);
  const completionMessages = {
    0: "You haven't completed any notes yet. Let's get started!",
  };

  const init = async () => {
    const response = await db.notes.list([Query.orderDesc("$createdAt")]);
    setNotes(response.documents);

    const completedNotes = notes.filter((note) => note.completed).length;
    const totalNotes = notes.length;

    setProgress(totalNotes > 0 ? completedNotes / totalNotes : 0);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const completedNotes = notes.filter((note) => note.completed).length;
    const totalNotes = notes.length;
    
    setProgress(totalNotes > 0 ? completedNotes / totalNotes : 0);
  }, [notes]);

  return (
    <>
      <div>
        <h1>✍️ My Notes</h1>
      </div>

      <div className="theme-options">
        <ThemeSelector
          theme="dark"
          backgroundColor="rgb(50, 50, 50)"
          borderColor="white"
        />
        <ThemeSelector
          theme="light"
          backgroundColor="rgb(230, 230, 230)"
          borderColor="black"
        />
        <ThemeSelector
          theme="purple"
          backgroundColor="rgb(80, 0, 100)"
          borderColor="white"
        />
        <ThemeSelector
          theme="navy"
          backgroundColor="rgb(30, 30, 70)"
          borderColor="white"
        />
      </div>

      <NoteForm
        setNotes={setNotes}
        setProgress={setProgress}
        noteCount={notes.length}
      />
      <ProgressBar
        variant="determinate"
        value={normalize(progress, 0, 1) * 100}
      />

      <div>
        {notes.map((note) => (
          <Note
            key={note.$id}
            noteData={note}
            setNotes={setNotes}
            setProgress={setProgress}
            noteCount={notes.length}
          />
        ))}
      </div>
    </>
  );
}

export default Notes;
