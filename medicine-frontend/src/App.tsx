import "./App.css";
import DashboardAdmin from "@/admin/templates/DashboardAdmin.tsx";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<DashboardAdmin />} />
    </Routes>
  );
}

export default App;
