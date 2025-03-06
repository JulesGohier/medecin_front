import "./App.css";
import DashboardAdmin from "@/templates/DashboardAdmin.tsx";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<DashboardAdmin />} />
    </Routes>
  );
}

export default App;
