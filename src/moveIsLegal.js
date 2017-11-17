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
	}

	return false;
}
module.exports = moveIsLegal;