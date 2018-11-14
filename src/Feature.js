import React, { Component } from "react";
import "./css/feature.css";

class Feature extends Component {
  render() {
    return (
      <a className="feature" style={this.props.css} href={this.props.link}>
        <div>{this.props.name}</div>
      </a>
    );
  }
}

export default Feature;
