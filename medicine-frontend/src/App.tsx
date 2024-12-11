import { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router";
import Homepage from "@/templates/Homepage.tsx";


function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path={"/"} element={<Homepage />} />
      </Routes>
  )
}

export default App
