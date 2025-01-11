import { useEffect, useState } from "react";
import { Query } from "appwrite";
import db from "../appwrite/databases";

import ThemeSelector from "../components/ThemeSelector";
import NoteForm from "../components/NoteForm";
import Note from "../components/Note";
import ProgressBar from "../components/ProgressBar";
import MilestoneText from "../components/MilestoneText";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [progress, setProgress] = useState(0);

  const init = async () => {
    const response = await db.notes.list([Query.orderDesc("$createdAt")]);
    setNotes(response.documents);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const completedNotes = notes.filter((note) => {
      console.log(note.completed);
      return note.completed;
    }).length;
    const totalNotes = notes.length;
    console.log(`${completedNotes} / ${totalNotes}`);
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

      <NoteForm setNotes={setNotes} />

      <MilestoneText percentage={progress * 100} noteCount={notes.length} />
      <ProgressBar
        variant="determinate"
        value={progress * 100}
        style={{ visibility: progress <= 0 ? "hidden" : "visible" }}
      />

      <div id="note-container">
        {notes.map((note) => (
          <Note key={note.$id} noteData={note} setNotes={setNotes} />
        ))}
      </div>      
    </>
  );
}

export default Notes;
