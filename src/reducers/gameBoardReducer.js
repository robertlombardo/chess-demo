// const alphabet = [ "a", "b", "c", "d", "e", "f", "g", "h" ];

const initialBoardState = [];
for( var x = 0; x < 8; ++x ) {
    initialBoardState[x] = [];
    for( var y = 0; y < 8; ++y ) {
      initialBoardState[x][y] = {
        color: (x%2)===(y%2)? "white" : "black",
        x,
        y,
        piece: null
      }
    }
  }

const piecesByFile = [
  "rook",
  "knight",
  "bishop",
  "queen",
  "king",
  "bishop",
  "knight",
  "rook"
]

for( var i = 0; i < 8; ++i ) {  
  initialBoardState[1][i].piece = {
    type: "pawn",
    color: "black"
  }

  initialBoardState[6][i].piece = {
    type: "pawn",
    color: "white"
  }

  initialBoardState[0][i].piece = {
    type: piecesByFile[i],
    color: "black"
  }

  initialBoardState[7][i].piece = {
    type: piecesByFile[i],
    color: "white"
  }
}

export default function game_board(state = initialBoardState, action) {

  switch (action.type) {

    // initial state
    default:
      return state;
  }
}