import React from "react";

export default function NoteCounter({ progress, noteCount }) {
  if (noteCount <= 0) return null;
  return (
    <h1>
      {progress} / {noteCount}
    </h1>
  );
}
