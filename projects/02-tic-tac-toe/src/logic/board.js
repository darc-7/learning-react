import { WINNER_COMBOS } from "../constants"

export const checkWinner = (boardToCheck)=>{
    //check for a possible winner by checking all possible combos
    for (let combo of WINNER_COMBOS){
      const [a,b,c] = combo
      // console.log([a,b,c])
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

export const checkEndGame =(newBoard)=>{
  return newBoard.every((square)=> square != null)
}