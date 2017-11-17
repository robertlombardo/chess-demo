// const alphabet = [ "a", "b", "c", "d", "e", "f", "g", "h" ];

const initialBoardState = [];
for( var x = 0; x < 8; ++x ) {
    initialBoardState[x] = [];
    for( var y = 0; y < 8; ++y ) {
      initialBoardState[x][y] = {
        color: (x%2)===(y%2)? "white" : "black",
        x,
        y
      }
    }
  }

export default function game_board(state = initialBoardState, action) {

  switch (action.type) {

    // initial state
    default:
      return state;
  }
}