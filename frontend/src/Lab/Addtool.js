import React, { Component } from "react";
import Popup from "reactjs-popup";
import { Button } from "react-bootstrap";
import "../App.css";
import {ListGroup} from "react-bootstrap";
import axios from "axios";

class Addtool extends Component {

  state = {
    tools: []
  };

  componentDidMount() {
    axios.get("/getalltools")
        .then(res => {this.setState({tools: res.data})});
  };

  render() {
    return (
      <Popup
        trigger={<Button className="addtoolButton">Add Tool</Button>}
        position="center"
      >
        {close => (
          <div>
            {this.state.tools.map((tool) => <Button onClick={() => {this.props.addLabTool(tool)}}>{tool}</Button>)}
            <a className="close" onClick={close}>
              &times;
            </a>
          </div>
        )}
      </Popup>
    );
  }
}

export default Addtool;
