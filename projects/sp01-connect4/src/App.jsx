import { useState } from 'react'
import './App.css'

const PLAYERS = ['red','blue']
function App() {
  const [turn, setTurn] = useState('red')
  const [winner, setWinner] = useSate(null)
  const [board, setBoard] = useState(Array(9).fill(null))

  return (
    <h3>Connect 4</h3>
  )
}

export default App
