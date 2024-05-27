import React, { Component } from "react";
import Header from "./component/header";
import Tables from "./component/tables";
import { refStringGen } from "./randomRefStringGen";
import List from "./component/list";
import { firstInFirstOut } from "./algorithms";

class VirtualMemory extends Component {
  state = {
    referenceInputTextField: "2,3,4,5,6,2,7,8",
    referenceString: ["2", "3", "4", "5", "6", "2", "7", "8"],
    frameNumber: 5,
    resetTurns: 4,
    jobProcessID: "", // Define jobProcessID in the state
    memorySize: "", // Define memorySize in the state
    selectedAlgorithm: { name: "First In First Out" },
  };

  handleRefChange = ({ target }) => {
    let { value } = target;
    if (
      value.match(/^$|^[0-9,]+$/) &&
      !value.match(/,,+,*|[0-9][0-9]+[0-9]*/g)
    ) {
      let tempReferenceString = [...value.split(",")];
      let filteredReferenceString = tempReferenceString.filter(
        (value) => value !== ""
      );
      this.setState({
        referenceInputTextField: value,
        referenceString: filteredReferenceString,
      });
    }
  };

  handleFrameChange = ({ target }) => {
    if ((target.value <= 7 && target.value >= 3) || target.value == 0)
      this.setState({ frameNumber: target.value });
  };

  handleResetTurnsChange = ({ target }) => {
    if (target.value <= 9 && target.value >= 0)
      this.setState({ resetTurns: target.value });
  };

  handleRefStringGenClick = () => {
    let tempReferenceStringInput = refStringGen(24, 9);
    let tempReferenceString = [...tempReferenceStringInput.split(",")];
    let filteredReferenceString = tempReferenceString.filter(
      (value) => value !== ""
    );
    this.setState({
      referenceInputTextField: tempReferenceStringInput,
      referenceString: filteredReferenceString,
    });
  };

  handleJobProcessIDChange = ({ target }) => {
    let { value } = target;
    // Ensure that only integer values are accepted for Job Process ID
    if (value.match(/^\d*$/)) {
      this.setState({ jobProcessID: value });
    }
  };

  handleMemorySizeChange = ({ target }) => {
    let { value } = target;
    // Ensure that only integer values are accepted for Memory Size
    if (value.match(/^\d*$/)) {
      this.setState({ memorySize: value });
    }
  };

  handleListChange = (algorithm) => {
    this.setState({ selectedAlgorithm: algorithm });
  };

  render() {
    let {
      frameNumber,
      resetTurns,
      referenceString,
      referenceInputTextField,
      selectedAlgorithm,
      jobProcessID,
      memorySize,
    } = this.state;
    let {
      handleRefChange,
      handleFrameChange,
      handleResetTurnsChange,
      handleRefStringGenClick,
      handleListChange,
      handleJobProcessIDChange,
      handleMemorySizeChange,
    } = this;
    const algorithms = [{ name: "First In First Out", f: firstInFirstOut }];
    const filteredAlgorithm =
      selectedAlgorithm && selectedAlgorithm["f"]
        ? algorithms.filter((a) => a["name"] === selectedAlgorithm["name"])
        : algorithms.filter((a) => a["name"] !== "Show All");
    return (
      <main className="container">
        <div className="row">
          <div className="col">
            <Header
              handleRefChange={handleRefChange}
              handleFrameChange={handleFrameChange}
              handleResetTurnsChange={handleResetTurnsChange}
              handleRefStringGenClick={handleRefStringGenClick}
              handleJobProcessIDChange={handleJobProcessIDChange}
              handleMemorySizeChange={handleMemorySizeChange}
              frameNumber={frameNumber}
              resetTurns={resetTurns}
              referenceInputTextField={referenceInputTextField}
              jobProcessID={jobProcessID} // Pass jobProcessID as a prop
              memorySize={memorySize} // Pass memorySize as a prop
            />
          </div>
          <div className="col-3 mt-2 list-group-outer-padding">
            <List
              algorithms={algorithms}
              handleListChange={handleListChange}
              selectedAlgorithm={selectedAlgorithm}
            />
          </div>
        </div>
        <div>
          <Tables
            frameNumber={frameNumber}
            resetTurns={resetTurns}
            referenceString={referenceString}
            jobProcessID={jobProcessID} // Pass jobProcessID as a prop
            memorySize={memorySize} // Pass memorySize as a prop
            algorithms={filteredAlgorithm}
          />
        </div>
      </main>
    );
  }
}

export default VirtualMemory;
