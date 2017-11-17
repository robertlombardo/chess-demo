import moveIsLegal from "../moveIsLegal";

const initialState = {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    gameBoardSize: Math.min( window.innerHeight, window.innerWidth ),
    pieceInHand: null,
    legalMoveSquares: []
};

export default function uiReducer(state = initialState, action) {
	switch( action.type ) {
        case "SCREEN_RESIZE":
        	return Object.assign({}, state, {
                screenWidth: action.screenWidth,
                screenHeight: action.screenHeight,
                gameBoardSize: Math.min( window.innerHeight, window.innerWidth ),
            });

        case "PICK_UP_PIECE":
            return Object.assign({}, state, {
                pieceInHand: {
                    type: action.piece.type,
                    color: action.piece.color,
                    originPos: action.piece.originPos
                },
                legalMoveSquares: getLegalMoveSquares( action.piece, action.gameState )
            });

        case "PLACE_PIECE":
            return Object.assign({}, state, {
                pieceInHand: null
            });


        default: return state;
    }
}

function getLegalMoveSquares( pieceToMove, gameState ) {
    var result = [];

    for( var row = 0; row < 8; ++row ) {
        for( var column = 0; column < 8; ++column ) {
            if( moveIsLegal(pieceToMove, {row,column}, gameState) ) {
                result.push( {row,column} );
            }
        }            
    }

    return result;
}