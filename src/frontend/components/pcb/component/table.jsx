import React, {Component} from "react";
import _ from "lodash";
import Fade from "react-reveal/Fade";

export default class Table extends Component {
    render() {
        let {referenceString, frameNumber, algorithmLabel, algorithm, colorMap, resetTurns, swapToggle, animationToggle, detailToggle} = this.props;
        let {pageInMemArray, pageFaults, pageNotInMemArray, referenceMapArray} = algorithm(referenceString, frameNumber, resetTurns);
        let frameNumberArray = _.range(0, frameNumber, 1);

        return (
            <div>
                <label>{algorithmLabel + ":"}</label>
                <div className="table-responsive">
                    <table className="table table-bordered table-sm table-custom-style">
                        <thead className="thead-dark">
                            <tr>
                                <th>Reference:</th>
                                {frameNumberArray.map(f => (
                                    <th key={f} className="table-cell-align-center">Frame {f + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
    {referenceString.map((ref, idx) => (
        <tr key={idx}>
            <th className="table-cell-align-center">{ref}</th>
            {frameNumberArray.map(f => (
                animationToggle ? (
                    <Fade right key={f}>
                        <td className={colorMap.get(pageInMemArray[idx][f]) + " table-cell-align-center"}>
                            {pageInMemArray[idx][f]}
                            {detailToggle && (
                                <sub>
                                    <sub>
                                        {(referenceMapArray[idx] ? referenceMapArray[idx].get(pageInMemArray[idx][f]) : "")}
                                    </sub>
                                </sub>
                            )}
                        </td>
                    </Fade>
                ) : (
                    <td key={f} className={colorMap.get(pageInMemArray[idx][f]) + " table-cell-align-center"}>
                        {pageInMemArray[idx][f]}
                        {detailToggle && (
                            <sub>
                                <sub>
                                    {(referenceMapArray[idx] ? referenceMapArray[idx].get(pageInMemArray[idx][f]) : "")}
                                </sub>
                            </sub>
                        )}
                    </td>
                )
            ))}
        </tr>
    ))}
    {swapToggle && referenceString.map((ref, idx) => (
        <tr key={idx} className="thead-light">
            <th className="table-cell-align-center">Swap {idx + 1}</th>
            {frameNumberArray.map(f => (
                animationToggle ? (
                    <Fade right key={f}>
                        <td className="table-cell-align-center">{pageNotInMemArray[idx][f]}</td>
                    </Fade>
                ) : (
                    <td key={f} className="table-cell-align-center">{pageNotInMemArray[idx][f]}</td>
                )
            ))}
            {/* Insert a column for page fault for each swap */}
            {animationToggle ? (
                <Fade right>
                    <td className="table-cell-align-center">{pageFaults[idx]}</td>
                </Fade>
            ) : (
                <td className="table-cell-align-center">{pageFaults[idx]}</td>
            )}
        </tr>
    ))}
</tbody>

                    </table>
                </div>
            </div>
        );
    }
}