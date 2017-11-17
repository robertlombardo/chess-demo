import moveIsLegal from "../moveIsLegal";

// const alphabet = [ "a", "b", "c", "d", "e", "f", "g", "h" ];

const initialBoard = [];

for( var row = 0; row < 8; ++row ) {
  initialBoard[row] = [];
  for( var column = 0; column < 8; ++column ) {
    initialBoard[row][column] = {
      color: (row%2)===(column%2)? "white" : "black",
      row,
      column,
      piece: null
    }
  }
}

const piecesByColumn = [
  "rook",
  "knight",
  "bishop",
  "queen",
  "king",
  "bishop",
  "knight",
  "rook"
]

for( var column = 0; column < 8; ++column ) {  
  initialBoard[1][column].piece = {
    type: "pawn",
    color: "black"
  }

  initialBoard[6][column].piece = {
    type: "pawn",
    color: "white"
  }

  initialBoard[0][column].piece = {
    type: piecesByColumn[column],
    color: "black"
  }

  initialBoard[7][column].piece = {
    type: piecesByColumn[column],
    color: "white"
  }
}

export default function gameState( state={board:initialBoard,turn:"white"}, action ) {
  
  switch( action.type ) {
    
    case "PLACE_PIECE":
      if( !moveIsLegal(action.piece,action.targetPos,state) ) {
        return state;
      }

      var newState = { board:[], turn:state.turn==="white"?"black":"white" };

      for( var row = 0; row < 8; ++row ) {
        newState.board[row] = [];
        for( var column = 0; column < 8; ++column ) {
          newState.board[row][column] = {
            color: state.board[row][column].color,
            row,
            column,
            piece: state.board[row][column].piece
          }
        }
      }

      const pieceToMove = newState.board[action.piece.originPos.row][action.piece.originPos.column].piece;      

      newState.board[action.targetPos.row][action.targetPos.column].piece = pieceToMove;
      newState.board[action.piece.originPos.row][action.piece.originPos.column].piece = null;

      return newState;

    // initial state
    default:
      return state;
  }
}