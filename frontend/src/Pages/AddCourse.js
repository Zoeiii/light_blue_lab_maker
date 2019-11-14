import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import "../App.css";

class AddCourse extends Component {

    state = {
        showAddCourse: false,
        courseName: '',
        term: ''
    };

    openAddCourse = () => {
        this.setState({showAddCourse: true})
    };

    closeAddCourse = () => {
        this.setState({showAddCourse: false})
    };

    addCourse() {
        axios.post("http://localhost:8080/addcourse", {title: this.state.courseName, term: this.state.term, professor: this.props.user.username})
            .then(res => {this.props.getCourseList();})
            .catch((err => {console.log("error")}));
        this.setState({
            showAddCourse: false,
            courseName: '',
            term: ''
        });
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
        <div>
            <Button onClick={this.openAddCourse}>
                Add Course
            </Button>

            <Modal show={this.state.showAddCourse} onHide={this.closeAddCourse}>
                <Modal.Header>
                    <Modal.Title>Add a New Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        Course Name
                        <br/>
                        <input
                            className="input"
                            name="courseName"
                            value={this.state.courseName}
                            onChange={this.onChange}
                        >
                        </input>

                        <br />
                        <br />

                        Term
                        <br />
                        <input
                            className="input"
                            name="term"
                            value={this.state.term}
                            onChange={this.onChange}
                        >
                        </input>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.addCourse()}>Add</Button>
                    <Button onClick={this.closeAddCourse}>Cancel</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
  }
}

export default AddCourse;