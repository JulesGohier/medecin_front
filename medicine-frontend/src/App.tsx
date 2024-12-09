import { useState } from 'react'
import './App.css'
import {Button} from "@/components/ui/button.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <Button onClick={() => {setCount(count + 1)}}>
          {count + 1} test
      </Button>
  )
}

export default App
