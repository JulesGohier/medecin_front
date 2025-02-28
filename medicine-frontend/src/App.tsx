import { Route, Routes } from "react-router-dom";
import Homepage from "@/templates/Homepage";
import Connexion from "@/templates/Connexion";
import Inscription from "@/templates/Inscription";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Homepage />} />
      <Route path={"/connexion"} element={<Connexion />} />
      <Route path={"/inscription"} element={<Inscription />} />
    </Routes>
  );
}

export default App;
