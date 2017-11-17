import moveIsLegal from "../moveIsLegal";

const initialWidth = window.innerWidth;
const initialHeight = window.innerHeight;

const initialState = {
    moduleWidth: initialWidth,
    moduleHeight: initialHeight,
    gameBoardSize: Math.min( initialWidth, initialHeight ),
    pieceInHand: null,
    legalMoveSquares: []
};

export default function uiReducer(state = initialState, action) {
	switch( action.type ) {
        case "SCREEN_RESIZE":
            const newWidth = Math.min( window.innerWidth, action.moduleWidth );
            const newHeight = Math.min( window.innerHeight, action.moduleHeight );

        	return Object.assign({}, state, {
                moduleWidth: newWidth,
                moduleHeight: newHeight,
                gameBoardSize: Math.min( newWidth, newHeight ),
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