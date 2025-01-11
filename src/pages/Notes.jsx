import { useEffect, useState } from "react";
import { Query } from "appwrite";
import db from "../appwrite/databases";

import Note from "../components/Note";
import NoteForm from "../components/NoteForm";
import NoteCounter from "../components/NoteCounter";
import ProgressBar from "../components/ProgressBar";
import ThemeSelector from "../components/ThemeSelector";
import MilestoneText from "../components/MilestoneText";
import BuiltWithLove from "@/components/BuiltWithLove";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState(null);

  const init = async () => {
    const response = await db.notes.list([Query.orderDesc("$createdAt")]);
    setNotes(response.documents);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const completedNotes = notes.filter((note) => {
      return note.completed;
    }).length;
    const totalNotes = notes.length;
    setProgress(totalNotes > 0 ? completedNotes / totalNotes : 0);
  }, [notes]);

  return (
    <>
      <BuiltWithLove />
      <div id="main-header-text">
        <h1>✍️ My Notes</h1>
        <NoteCounter
          progress={notes.filter((note) => note.completed).length}
          noteCount={notes.length}
        />
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

      <NoteForm setNotes={setNotes} setAlert={setAlert} alert={alert} />

      <MilestoneText percentage={progress * 100} noteCount={notes.length} />
      <ProgressBar
        percentage={progress * 100}
        style={{ visibility: progress <= 0 ? "hidden" : "visible" }}
        animate={{
          time: "0.5s",
          style: "ease-out",
        }}
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
