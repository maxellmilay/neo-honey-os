import React, { Component } from "react";
import TableVM from "./table";

export default class Tables extends Component {
  render() {
    let {
      referenceString,
      frameNumber,
      resetTurns,
      swapToggle,
      animationToggle,
      algorithms,
      detailToggle,
      jobProcessID, // Receive jobProcessID from props
      memorySize // Receive memorySize from props
    } = this.props;
    let referenceMap = new Map();
    referenceMap.set("0", "table-primary");
    referenceMap.set("1", "table-secondary");
    referenceMap.set("2", "table-info");
    referenceMap.set("3", "table-warning");
    referenceMap.set("4", "table-danger");
    referenceMap.set("5", "table-success");
    referenceMap.set("6", "table-add-0");
    referenceMap.set("7", "table-add-1");
    referenceMap.set("8", "table-add-2");
    referenceMap.set("9", "table-add-3");
    return algorithms.map((a) => (
      <TableVM
        key={a["name"]}
        colorMap={referenceMap}
        frameNumber={frameNumber}
        resetTurns={resetTurns}
        swapToggle={swapToggle}
        detailToggle={detailToggle}
        animationToggle={animationToggle}
        referenceString={referenceString}
        jobProcessID={jobProcessID} // Pass jobProcessID as a prop to TableVM
        memorySize={memorySize} // Pass memorySize as a prop to TableVM
        algorithmLabel={a["name"]}
        algorithm={a["f"]}
      />
    ));
  }
}
