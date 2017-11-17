function moveIsLegal( pieceToMove, targetPos, gameState ) {
	if( !pieceToMove || !targetPos || !gameState ) {
		return false;
	}

	if( pieceToMove.color !== gameState.turn ) {
		return false;
	}

	const pieceAtTargetPos = gameState.board[targetPos.row][targetPos.column].piece

	if( pieceAtTargetPos && pieceAtTargetPos.color===pieceToMove.color ) {
		return false;
	}

	// create paths for pieces that move in straight lines
	var MOVE_PATHS;
	if( pieceToMove.type==="queen" || pieceToMove.type==="bishop" || pieceToMove.type==="rook" ) {
		MOVE_PATHS = { 
			squaresL: getAvailableSquaresInDirection( 0, -1 ),
			squaresR: getAvailableSquaresInDirection( 0, 1 ),
			squaresU: getAvailableSquaresInDirection( -1, 0 ),
			squaresD: getAvailableSquaresInDirection( 1, 0 ),
			squaresUL: getAvailableSquaresInDirection( -1, -1 ),
			squaresUR: getAvailableSquaresInDirection( -1, 1 ),
			squaresDR: getAvailableSquaresInDirection( 1, 1 ),
			squaresDL: getAvailableSquaresInDirection( 1, -1 )
		}

		function getAvailableSquaresInDirection( rowIncrement, columnIncrement ) {
			const result = [];

			for( var n = 1; n < 7; ++n ) {
				var testRow = pieceToMove.originPos.row+n*rowIncrement;
				var testCol = pieceToMove.originPos.column+n*columnIncrement;

				if( testRow<0||testRow>7 || testCol<0||testCol>7 ) {
					// off the board
					return result;
				}

				var testSquare = gameState.board[testRow]? gameState.board[testRow][testCol] : null;

				if( testSquare && testSquare.piece ) {
					if( testSquare.piece.color===pieceToMove.color) {
						// path is blocked by a friendly piece
						return result;
					} else {
						// can capture - so add it as available, but stop iterating
						result.push( {row:testRow,column:testCol} );
						break;
					}
				} else {
					result.push( {row:testRow,column:testCol} );
				}
			}

			return result;
		}
	}

	switch( pieceToMove.type ) {
		
		case "pawn":
			if( pieceToMove.originPos.column===targetPos.column && !pieceAtTargetPos ) {
				if( pieceToMove.color==="white" ) {
					if( targetPos.row===pieceToMove.originPos.row-1 ) {
						return true;
					} 
					if( pieceToMove.originPos.row===6 && targetPos.row===pieceToMove.originPos.row-2 ) {
						return true;
					}
				} else if( pieceToMove.color==="black" ) {
					if( targetPos.row===pieceToMove.originPos.row+1 ) {
						return true;
					} 
					if( pieceToMove.originPos.row===1 && targetPos.row===pieceToMove.originPos.row+2 ) {
						return true;
					}
				}
			} else if( 		Math.abs(pieceToMove.originPos.column-targetPos.column)===1
						&& 	pieceAtTargetPos && pieceAtTargetPos.color!==pieceToMove.color ) {
				if( pieceToMove.color==="white" && targetPos.row===pieceToMove.originPos.row-1 ) {
					return true;
				}
				if( pieceToMove.color==="black" && targetPos.row===pieceToMove.originPos.row+1 ) {
					return true;
				}
			}

			// TO DO: en passant

		case "queen":
			for( var prop in MOVE_PATHS ) {
				for( var i = 0; i < MOVE_PATHS[prop].length; ++i ) {
					if( MOVE_PATHS[prop][i].row===targetPos.row && MOVE_PATHS[prop][i].column===targetPos.column ) {
						return true;
					}
				}
			}

			return false;

	}	
}
module.exports = moveIsLegal;