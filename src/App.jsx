import { useState } from 'react'
import './App.css'
import Slider from './Components/slider'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <Slider/>
    </>
  )
}

export default App
