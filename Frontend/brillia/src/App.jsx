import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Brillia from './Brillia'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Brillia />
    </>
  )
}

export default App
