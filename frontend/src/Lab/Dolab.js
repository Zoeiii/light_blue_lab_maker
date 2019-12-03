import React, {Component} from "react";
import axios from "axios";
import {withRouter} from "react-router";
import Konva from "konva";
import {Stage, Layer, Star, Text, Image} from "react-konva";
import useImage from "use-image";
import Sidebar from "../Layout/Sidebar";
import {LinkContainer} from "react-router-bootstrap";
import {
    Button,
    ButtonGroup,
    Card,
    Col,
    Dropdown,
    Form,
    ListGroup,
    Row,
    Modal,
    CardDeck,
    ProgressBar
} from "react-bootstrap";
import Addtool from "./Addtool";
import ToolModal from "./Toolmodal";
import LabStageBar from "./LabStageBar";
import LabTool from "./LabTool";
import Tooltip from "./Tooltip";
import "../App.css";

const stageW = window.innerWidth - window.innerWidth * 0.3;
const stageH = window.innerHeight - 200;

class Dolab extends Component {

    state = {
        getTotalStage: -1,
        currentStage: -1,
        currentTool: [],
        showPop: false,
        stage: {
            stageNum: -1,
            stageTool: [],
            instructions: ""
        }
    };

    back = () => {
        this.props.history.push("/labspage");
    };

    getTotalStage() {
        axios.get("http://localhost:8080/gettotalstage").then(res => {
            this.setState({getTotalStage: res.data});
        });
    }

    getCurrentStage() {
        axios.get("http://localhost:8080/getcurrentstage").then(res => {
            this.setState({currentStage: res.data});
        });
    }

    getNextStage = () => {
        axios.get("http://localhost:8080/getnextstage").then(res => {
            this.getCurrentStage();
            this.getStage();
        });
    };

    getStage = () => {
        axios
            .get(
                "http://localhost:8080/getdolabstage"
            )
            .then(
                res => {
                    this.setState({stage: res.data})
                }
            )
    };

    componentDidMount() {
        this.getStage();
        this.getTotalStage();
        this.getCurrentStage();
    }

    setShowModal = () => {
        this.setState({showPop: !this.state.showPop});
    };

    setCurrentTool = tool => {
        this.setState({currentTool: tool});
    };

    setCurrentStage = i => {
        let data = JSON.stringify(i);
        if (i > -1) {
            axios
                .post("http://localhost:8080/getstage", data, {
                    headers: {"Content-Type": "application/json;charset=UTF-8"},
                    params: {stageNum: i}
                })
                .then(res => {
                    this.setState({currentStage: res.data});
                });
        } else {
            this.setState({currentStage: {stageNum: -1, stageTool: []}});
        }
    };

    render() {
        return (
            <React.Fragment>
                <ToolModal
                    setTool={this.setCurrentTool}
                    tool={this.state.currentTool}
                    stageNum={this.state.stage.stageNum}
                    showPop={this.state.showPop}
                    setShow={this.setShowModal}
                    setCurrentStage={this.setCurrentStage}
                />
                <Row>
                    <Stage width={stageW} height={stageH} className="stage">
                        <Layer>
                            {this.state.stage.stageTool.map((tool, key) => (
                                <LabTool
                                    key={key}
                                    src={tool.Img}
                                    x={tool.x}
                                    y={tool.y}
                                    id={tool.id}
                                    stageNum={this.state.stage.stageNum}
                                    stageTool={this.state.stage.stageTool}
                                    setCurrentStage={this.setCurrentStage}
                                    setTool={this.setCurrentTool}
                                    setShowModal={this.setShowModal}
                                />
                            ))}

                            <Text
                                text={this.state.stage.instructions}
                                fontSize={20}
                                x={0.1 * stageW}
                                y={0.05 * stageH}
                                width={0.8 * stageW}
                                align="center"
                            />
                        </Layer>
                    </Stage>

                    <Card border="secondary" className="col-md-2">
                        <Card.Body>
                            <Card.Title>Lab Progress</Card.Title>
                            <Modal.Body
                                style={{
                                    "max-height": "calc(100vh - 310px)",
                                    "overflow-y": "auto"
                                }}
                            >
                                <ProgressBar
                                    now={Math.round(100*(this.state.currentStage/this.state.getTotalStage))}
                                    label={Math.round(100*(this.state.currentStage/this.state.getTotalStage))}
                                />
                                <br/>
                                {
                                    this.state.currentStage+1===this.state.getTotalStage?
                                        <Button onClick={this.back}>Finish</Button>
                                        :
                                        <Button onClick={this.getNextStage}>Next</Button>
                                }
                            </Modal.Body>
                        </Card.Body>
                    </Card>

                </Row>
            </React.Fragment>
        );
    }
}
export default withRouter(Dolab);
