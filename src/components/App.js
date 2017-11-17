import React from "react";
import { connect, mapDispatchToProps } from "react-redux";
import "../stylesheets/main.scss";

// app component
export class App extends React.Component {
  

  // render
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}
