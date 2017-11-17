import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

// Home page component
export class GameBoard extends React.Component {
  // render
  render() {
  	const BOARD_SIZE = Math.min( this.props.ui.screenWidth, this.props.ui.screenHeight );
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
				{this.props.game_board.map((row,i)=>{
					return( 
						<tr style={{height:SQUARE_SIZE}} key={i}>
							{row.map((square,i)=>{
								return(
									<td className={"square "+square.color+"-square"} style={{width:SQUARE_SIZE,height:SQUARE_SIZE}} key={i}>
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
}

// export the connected class
function mapStateToProps(state) {
  return {
    game_board: state.game_board,
    ui: state.ui
  };
}
export default connect(mapStateToProps)(GameBoard);