import React from "react";
import GameBoard from "./GameBoard";
import { Button } from "react-bootstrap"
import { connect } from "react-redux";
import "../stylesheets/main.scss";

// Home page component
export class ChessModule extends React.Component {
  constructor(props) {
    super(props);

    this.onResetBtnClick = this.onResetBtnClick.bind( this );
  }

  componentWillMount() {
  	window.addEventListener('resize', () => {
	    this.props.dispatch({
	    	type: "SCREEN_RESIZE",
	    	moduleWidth: this.refs.chessModule.clientWidth,
	    	moduleHeight: this.refs.chessModule.clientWidth
	    });
	  });
  }

  // render
  render() {
    return (
      <div className="chess-module container" id="chessModule" ref="chessModule">
      	<GameBoard ref="gameBoard"/>
        <Button className="reset-btn" ref="resetBtn" onClick={this.onResetBtnClick} style={{
          top: this.props.ui.moduleHeight/2,
          left: this.props.ui.moduleWidth/2 - this.props.ui.gameBoardSize/2 - 80
        }}>
          Reset
        </Button>
      </div>
    );
  }

  componentDidMount() {
    this.props.dispatch({
      type: "SCREEN_RESIZE",
      moduleWidth: this.refs.chessModule.clientWidth,
      moduleHeight: this.refs.chessModule.clientWidth
    });
  }

  onResetBtnClick() {
    this.props.dispatch({
      type: "RESET_GAME_BOARD"
    })
  }
}

function mapStateToProps( state ) {
	return {
    ui: state.ui
  };
}

export default connect(mapStateToProps)(ChessModule);
