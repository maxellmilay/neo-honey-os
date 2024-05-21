import React, { Component } from "react";
import _ from "lodash";
import Fade from "react-reveal/Fade";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

export default class TableVM extends Component {
  // Define a function to generate color palette
  generateColorPalette = () => {
    const excludedColors = ["#006400", "#FF0000"]; // Green and Red
    const availableColors = [
      "#C1B6A3", // Light brown
      "#FFCC99", // Light orange
      "#FFD699", // Light yellow
      "#FFE6CC", // Light peach
      "#CCFFFF", // Light cyan
      "#99CCFF", // Light blue
      "#CCCCFF", // Light lavender
      "#FFCCFF", // Light pink
      "#FFFF99"
    ];
    const colors = availableColors.filter(color => !excludedColors.includes(color));
    return colors;
  };

  // Define a function to generate a random memory size
  generateRandomMemorySize = () => {
    const minSize = 1;
    const maxSize = 100; // Adjust as needed for realistic memory sizes
    return Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
  };

  render() {
    let {
      referenceString,
      frameNumber,
      algorithmLabel,
      algorithm,
      resetTurns,
    } = this.props;
    let { pageInMemArray, pageFaults, pageNotInMemArray } = algorithm(
      referenceString,
      frameNumber,
      resetTurns
    );
    let frameNumberArray = _.range(0, frameNumber, 1);
    const colorPalette = this.generateColorPalette();

    // Generate random memory sizes for each job process
    const memorySizes = referenceString.map(() => this.generateRandomMemorySize());

    return (
      <div>
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Job Process</TableHead>
              <TableHead>Memory Size</TableHead>
              <TableHead>Working Set</TableHead>
              <TableHead>Swapped Memory</TableHead>
              <TableHead>Page Fault</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {referenceString.map((ref, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{ref}</TableCell>
                <TableCell>{memorySizes[idx]}</TableCell> {/* Memory Size column */}
                <TableCell>
                  {pageInMemArray[idx].map((frame, frameIdx) => (
                    <TableCell
                      key={frameIdx}
                      style={{
                        backgroundColor: colorPalette[frame % colorPalette.length],
                      }}
                    >
                      {frame}
                    </TableCell>
                  ))}
                </TableCell>
                <TableCell>
                  {pageNotInMemArray[idx].map((frame, frameIdx) => (
                    <TableCell
                      key={frameIdx}
                      style={{
                        backgroundColor: colorPalette[frame % colorPalette.length],
                      }}
                    >
                      {frame}
                    </TableCell>
                  ))}
                </TableCell> {/* Swapped Memory column */}
                <TableCell>
                  <Fade right>
                    {pageFaults[idx] === "F" ? (
                      <span style={{ color: "#FF0000" }}>{pageFaults[idx]}</span>
                    ) : (
                      <span style={{ color: "#006400" }}>{pageFaults[idx]}</span>
                    )}
                  </Fade>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
