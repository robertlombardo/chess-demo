import React from "react";
import GameBoard from './GameBoard';
import { connect } from "react-redux";

// Home page component
export class Home extends React.Component {
  componentWillMount() {
  	window.addEventListener('resize', () => {
	    this.props.dispatch({
	    	type: 'SCREEN_RESIZE',
	    	screenWidth: window.innerWidth,
	    	screenHeight: window.innerHeight
	    });
	});
  }

  // render
  render() {
    return (
      <div className="page-home">
      	<GameBoard />
      </div>
    );
  }
}

function mapStateToProps( state ) {
	return state;
}

export default connect(mapStateToProps)(Home);
