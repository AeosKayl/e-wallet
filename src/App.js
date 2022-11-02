import { Routes, Route } from "react-router-dom";
import "./App.css";
import AddCardPage from "./pages/AddCardPage";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/addcard" element={<AddCardPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
