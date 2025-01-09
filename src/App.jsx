import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Login from "./pages/Login";

function App() {
  return (
    <div id="app">
      <div id="container">
        <BrowserRouter>
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
