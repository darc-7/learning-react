import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square"
import { Board } from "./components/Board"
import { TURNS } from "./constants"
import { checkWinner, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { saveGameStorage, resetGameStorage } from "./logic/storage"

function App(){
  //useState Hook ALWAYS in the root of the component
  const [board, setBoard] = useState(()=>{
    const boardFromLS = window.localStorage.getItem('board')
    return JSON.parse(boardFromLS) ?? Array(9).fill(null)
  });

  const [turn, setTurn] = useState(()=>{
    const turnFromLS = window.localStorage.getItem('turn')
    return JSON.parse(turnFromLS) ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)
  
  const resetGame =()=>{
    setBoard((Array(9).fill(null)))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index)=>{
    if (board[index] || winner) return
    //new board
    const newBoard = [...board]
    newBoard[index]=turn
    setBoard(newBoard)
    //new turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //save on localStorage
    saveGameStorage({
      board: newBoard,
      turn: newTurn
    })
    //check for winner
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard))
      setWinner(false)
  }

	return(
		<main className="board">
			<h1>Tic-tac-toe</h1>
      <button onClick={resetGame}>Restart</button>
      <section className="game">
        {<Board board={board} updateBoard={updateBoard}/>}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    <WinnerModal resetGame={resetGame} winner={winner}/>
  </main>
	)
}

export default App