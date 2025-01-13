import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Login from "./pages/Login";

function App() {
  if (window.matchMedia("(prefers-color-scheme: dark)")) {
    document.body.setAttribute("data-theme", "dark");
  }
  return (
    <div id="app">
      <div id="container">
        <BrowserRouter
          basename="/productivity-app"
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route element={<Notes />} path="/" />
            <Route element={<Login />} path="/login" />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
