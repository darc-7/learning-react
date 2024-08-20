import { useState } from "react"

const TURNS = {
	X: 'x',
	O: 'o'
}

const Square = ({children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = ()=>{
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App(){
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);
  
  const checkWinner = (boardToCheck)=>{
    //check for a possible winner by checking all possible combos
    for (let combo of WINNER_COMBOS){
      const [a,b,c] = combo
      console.log([a,b,c])
      if (boardToCheck[a] != '' && 
          boardToCheck[a] === boardToCheck[b] &&
          boardToCheck[a] === boardToCheck[c]
      ) {
          return boardToCheck[a]
      }
      //no winner
    }
    return null;
  }

  const resetGame =()=>{
    setBoard((Array(9).fill(null)))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame =(newBoard)=>{
    return newBoard.every((square)=> square != null)
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
    //check for winner
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    } else if (checkEndGame(newBoard))
      setWinner(false)
  }

	return(
		<main className="board">
			<h1>Tic-tac-toe</h1>
      <button onClick={resetGame}>Restart</button>
			  <section className="game">
          {
            board.map((square,index)=>{
              return(
                <Square 
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                >
                  {square}
                </Square>
              )
            })
          }
			  </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        {
          winner != null && (
            <section className="winner">
              <div className="text">
                <h2>
                  {winner === false ? 'Draw' : 'Winner is'}
                </h2>
              
                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                  <button onClick={resetGame}>Restart</button>
                </footer>
              </div>
            </section>
          )
        }
		</main>
	)
}

export default App