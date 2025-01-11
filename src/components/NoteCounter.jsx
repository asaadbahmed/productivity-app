import React from "react";

export default function NoteCounter({ notes }) {
  return (
    <h1>
      {notes.filter((note) => note.completed).length} / {notes.length}
    </h1>
  );
}
