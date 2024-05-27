import React, { Component } from "react";

export default class Header extends Component {
    render() {
        let { handleRefChange, handleResetTurnsChange, handleRefStringGenClick, handleJobProcessIDChange, referenceInputTextField, resetTurns, jobProcessID } = this.props;
        const frameNumber = 5; // Fixed frame number

        return (
            <div>
                <div className="input-group mt-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="addon-wrapping" data-toggle="tooltip" data-placement="top" title="Enter  Reference String 0~9 separated with ','"> Reference String</span>
                    </div>
                    <input type="text" name="referenceInputTextField" className="form-control" placeholder=" Reference String [0-9] separated with ','" value={referenceInputTextField} onChange={handleRefChange.bind(this)} />
                </div>
                
                <div className="input-group mt-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Job Process ID</span>
                    </div>
                    <input type="text" name="jobProcessID" className="form-control" placeholder="Job Process ID" value={jobProcessID} onChange={handleJobProcessIDChange.bind(this)} />
                </div>
            
                <button type="button" className={"btn btn-danger mt-2 mr-2"} onClick={handleRefStringGenClick}>Generate String</button>
            </div>
        )
    }
}
