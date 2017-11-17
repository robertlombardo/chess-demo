import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

// Home page component
export class GameBoard extends React.Component {
  // render
  render() {
  	const BOARD_SIZE = this.props.ui.gameBoardSize;
  	const SQUARE_SIZE = BOARD_SIZE/8;
  	const IMG_COORDS_BY_PIECE = {
		white_king: { x:SQUARE_SIZE*0, y:0 },
		white_queen: { x:SQUARE_SIZE*1, y:0 },
		white_bishop: { x:SQUARE_SIZE*2, y:0 },
		white_knight: { x:SQUARE_SIZE*3, y:0 },
		white_rook: { x:SQUARE_SIZE*4, y:0 },
		white_pawn: { x:SQUARE_SIZE*5, y:0 },
		black_king: { x:SQUARE_SIZE*0, y:SQUARE_SIZE },
		black_queen: { x:SQUARE_SIZE*1, y:SQUARE_SIZE },
		black_bishop: { x:SQUARE_SIZE*2, y:SQUARE_SIZE },
		black_knight: { x:SQUARE_SIZE*3, y:SQUARE_SIZE },
		black_rook: { x:SQUARE_SIZE*4, y:SQUARE_SIZE },
		black_pawn: { x:SQUARE_SIZE*5, y:SQUARE_SIZE }
	}

    return (
		<Table className="game-board" style={{width:BOARD_SIZE}}>
		    <tbody>
				{this.props.gameState.board.map((row,i)=>{
					return( 
						<tr style={{height:SQUARE_SIZE}} key={i}>
							{row.map((square,i)=>{
								const hasPieceAndIsInHand = 
									   this.props.ui.pieceInHand
									&& this.props.ui.pieceInHand.originPos.row===square.row
									&& this.props.ui.pieceInHand.originPos.column===square.column;

								var isALegalMoveTarget = false;
								if( this.props.ui.pieceInHand && this.props.ui.legalMoveSquares  ) {
									for( var j = 0; j < this.props.ui.legalMoveSquares.length; ++j ) {
										var candidate = this.props.ui.legalMoveSquares[j];
										if( square.row===candidate.row && square.column===candidate.column ) {
											isALegalMoveTarget=  true;
											break;
										}
									}
								}

								return(
									<td className={"square "+square.color+"-square"} 
										style={{
											width:SQUARE_SIZE,
											height:SQUARE_SIZE,
											border: hasPieceAndIsInHand? "3px solid yellow" : isALegalMoveTarget? square.piece? "3px solid red" : "3px solid blue" : "none"
										}} 
										key={i}
										onClick={this.onSquareClick.bind(this,square)}
									>
										{getGamePiece(square)}
									</td>								
								)
							})}
						</tr>
					);						
				})}
		    </tbody>
		</Table>
    );

    function getGamePiece( square ) {
    	if( square.piece ) {
    		return(
    			<img className="game-piece" 
    				 src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chess_Pieces_Sprite.svg/2000px-Chess_Pieces_Sprite.svg.png" 
    				 style={{
    				 	width: SQUARE_SIZE*6,
    				 	height: SQUARE_SIZE*2,
    				 	left: -IMG_COORDS_BY_PIECE[ square.piece.color+"_"+square.piece.type ].x,
    				 	top: -IMG_COORDS_BY_PIECE[ square.piece.color+"_"+square.piece.type ].y
    				 }}
    			/>
    		)
    	}
    }
  }

  onSquareClick( square ) {
  	if( this.props.ui.pieceInHand ) {
  		this.props.dispatch({
	    	type: "PLACE_PIECE",
	    	piece: this.props.ui.pieceInHand,
	    	targetPos: { row:square.row, column:square.column }
	    });
  	} else if( square.piece && square.piece.color===this.props.gameState.turn ) {
  		this.props.dispatch({
	    	type: "PICK_UP_PIECE",
	    	piece: {
	    		type: square.piece.type,
	    		color: square.piece.color,
	    		originPos: {row:square.row, column:square.column}
	    	},
	    	gameState: this.props.gameState
	    });
  	}
  }
}

// export the connected class
function mapStateToProps(state) {
  return {
    gameState: state.gameState,
    ui: state.ui
  };
}
export default connect(mapStateToProps)(GameBoard);