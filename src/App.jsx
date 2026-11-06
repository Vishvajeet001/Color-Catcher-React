import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/results" element={<GameOver />} />
    </Routes>
  );
}

export default App;
