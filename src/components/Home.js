import React from "react";
import GameBoard from "./GameBoard";
import { Button } from "react-bootstrap"
import { connect } from "react-redux";

// Home page component
export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.onResetBtnClick = this.onResetBtnClick.bind( this );
  }

  componentWillMount() {
  	window.addEventListener('resize', () => {
	    this.props.dispatch({
	    	type: "SCREEN_RESIZE",
	    	screenWidth: window.innerWidth,
	    	screenHeight: window.innerHeight
	    });
	  });
  }

  // render
  render() {
    return (
      <div className="page-home">
      	<GameBoard ref="gameBoard"/>
        <Button className="reset-btn" ref="resetBtn" onClick={this.onResetBtnClick} style={{
          top: this.props.ui.screenHeight/2,
          left: this.props.ui.screenWidth/2 - this.props.ui.gameBoardSize/2 - 80
        }}>
          Reset
        </Button>
      </div>
    );
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

export default connect(mapStateToProps)(Home);
