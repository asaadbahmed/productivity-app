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
      </div>

      <NoteForm setNotes={setNotes} />
      <ProgressBar variant="determinate" value={normalize(progress, 0, 1) * 100} />

      <div>
        {notes.map((note) => (
          <Note
            key={note.$id}
            noteData={note}
            setNotes={setNotes}
            setProgress={setProgress}
            numberOfNotes={notes.length}
          />
        ))}
      </div>
    </>
  );
}

export default Notes;
