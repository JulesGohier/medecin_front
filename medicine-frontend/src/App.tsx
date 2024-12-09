import { useState } from 'react'
import './App.css'
import {Button} from "@/components/ui/button.tsx";
import { Camera } from 'lucide-react';


function App() {
  const [count, setCount] = useState(0)

  return (
      <Button onClick={() => {setCount(count + 1)}}>
          <Camera /> {count + 1}
      </Button>
  )
}

export default App
