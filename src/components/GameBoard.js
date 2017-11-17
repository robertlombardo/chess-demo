import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

// Home page component
export class GameBoard extends React.Component {
  // render
  render() {
  	const BOARD_SIZE = Math.min( this.props.ui.screenWidth, this.props.ui.screenHeight );
  	const SQUARE_SIZE = BOARD_SIZE/8;

    return (
		<Table className="game-board" style={{width:BOARD_SIZE}}>
		    <tbody>
				{this.props.game_board.map((row,i)=>{
					return( 
						<tr style={{height:SQUARE_SIZE}} key={i}>
							{row.map((square,i)=>{
								return(
									<td className={square.color+"-square"} style={{width:SQUARE_SIZE}} key={i}></td>
								)
							})}
						</tr>
					);						
				})}
		    </tbody>
		</Table>
    );
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
