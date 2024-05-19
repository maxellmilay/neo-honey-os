import React, { Component } from 'react';
import Header from "./component/header";
import Tables from "./component/tables";
import { refStringGen } from "./randomRefStringGen";
import List from "./component/list";
import { firstInFirstOut } from "./algorithms";

class VisualMemory extends Component {
    state = {
        referenceInputTextField: "2,3,4,5,6,2,7,8",
        referenceString: ["2", "3", "4", "5", "6", "2", "7", "8"],
        frameNumber: 5,
        resetTurns: 4,
        selectedAlgorithm: { name: "First In First Out" },
    }

    handleRefChange = ({ target }) => {
        let { value } = target;
        if (value.match(/^$|^[0-9,]+$/) && !value.match(/,,+,*|[0-9][0-9]+[0-9]*/g)) {
            let tempReferenceString = [...value.split(",")];
            let filteredReferenceString = tempReferenceString.filter((value) => value !== "");
            this.setState({ referenceInputTextField: value, referenceString: filteredReferenceString });
        }
    }

    handleFrameChange = ({ target }) => {
        if ((target.value <= 7 && target.value >= 3) || target.value == 0)
            this.setState({ frameNumber: target.value });
    }

    handleResetTurnsChange = ({ target }) => {
        if (target.value <= 9 && target.value >= 0)
            this.setState({ resetTurns: target.value });
    }

    handleRefStringGenClick = () => {
        let tempReferenceStringInput = refStringGen(24, 9);
        let tempReferenceString = [...tempReferenceStringInput.split(",")];
        let filteredReferenceString = tempReferenceString.filter((value) => value !== "");
        this.setState({ referenceInputTextField: tempReferenceStringInput, referenceString: filteredReferenceString });
    }

    handleListChange = (algorithm) => {
        this.setState({ selectedAlgorithm: algorithm });
    }

    render() {
        let { frameNumber, resetTurns, referenceString, referenceInputTextField, selectedAlgorithm } = this.state;
        let { handleRefChange, handleFrameChange, handleResetTurnsChange, handleRefStringGenClick, handleListChange } = this;
        const algorithms = [
            { name: "First In First Out", f: firstInFirstOut },
        ]
        const filteredAlgorithm = selectedAlgorithm && selectedAlgorithm['f'] ? algorithms.filter(a => a['name'] === selectedAlgorithm['name']) : algorithms.filter(a => a['name'] !== "Show All");
        return (
            <main className="container">
                <div className="row">
                    <div className="col">
                        <Header
                            handleRefChange={handleRefChange}
                            handleFrameChange={handleFrameChange}
                            handleResetTurnsChange={handleResetTurnsChange}
                            handleRefStringGenClick={handleRefStringGenClick}
                            frameNumber={frameNumber}
                            resetTurns={resetTurns}
                            referenceInputTextField={referenceInputTextField}
                        />
                    </div>
                    <div className="col-3 mt-2 list-group-outer-padding">
                        <List algorithms={algorithms} handleListChange={handleListChange} selectedAlgorithm={selectedAlgorithm} />
                    </div>
                </div>
                <div>
                    <Tables
                        frameNumber={5}
                        resetTurns={resetTurns}
                        referenceString={referenceString}
                        algorithms={filteredAlgorithm}
                    />
                </div>
            </main>
        );
    }
}

export default VisualMemory;
