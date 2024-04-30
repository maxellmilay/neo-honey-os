

import React, { useState } from "react";
import Draggable from "react-draggable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from "../../components/ui/table";
import { Copy, FolderOpenDot, FolderOpen, Save, SaveAll } from "lucide-react";
import pcbIcon from "../../assets/img/pcbIcon.png";

function PCB() {
  const [dialogCount, setDialogCount] = useState(1);
  const [dialogStates, setDialogStates] = useState(Array.from({ length: 1 }, () => true));

  const [fileContent, setFileContent] = useState("");
  const [isModified, setIsModified] = useState(false);

  const handleChange = (event) => {
    setFileContent(event.target.value);
    setIsModified(true); // Set modification state to true when content changes

  };

  const handleCloseDialog = (index) => {
    setDialogStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  }


  const renderDialogContent = () => {
    const dialogContentArray = [];
    for (let i = 0; i < dialogCount; i++) {
      dialogContentArray.push(
        <>
          <Draggable positionOffset={{ x: '-50%', y: '-50%' }}>
            <DialogContent key={i} className="w-fit object-center">
              <div className="">
                <DialogHeader>
                  <DialogTitle className="text-s">Process Control Block</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col">
                  <div className="mb-2">
                    <Button
                      style={{
                        color: "black",
                        width: "200px",
                        height: "40px",
                        textAlign: "left",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      <FolderOpen className="mr-2 h-4 w-4 inline-block align-middle" />{" "}
                      First-Come First-Served
                    </Button>
                  </div>
                  <div className="mb-2">
                    <Button
                      style={{
                        color: "black",
                        width: "200px",
                        height: "40px",
                        textAlign: "left",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      <FolderOpenDot className="mr-2 h-4 w-4 inline-block align-middle" />{" "}
                      <>Shortest Job First (Preemptive)</>
                    </Button>
                  </div>
                  <div className="mb-2">
                    <Button
                      style={{
                        color: "black",
                        width: "200px",
                        height: "40px",
                        textAlign: "left",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      <Save className="mr-2 h-4 w-4 inline-block align-middle" />
                      Priority Scheduling
                    </Button>

                  </div>
                  <div className="mb-2">
                    <Button
                      style={{
                        color: "black",
                        width: "200px",
                        height: "40px",
                        textAlign: "left",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      <SaveAll className="mr-2 h-4 w-4 inline-block align-middle" />{" "}
                      Round Robin
                    </Button>
                  </div>
                </div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Process ID</TableCell>
                      <TableCell>Arrival Time</TableCell>
                      <TableCell>Burst Time</TableCell>
                      <TableCell>Priority</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>6</TableCell>
                      <TableCell>2</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4</TableCell>
                      <TableCell>6</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>4</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </DialogContent>
          </Draggable>
        </>
      );
    }
    return dialogContentArray;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  id="pcb-button" variant="link" size="appIcon" className="transparent" >
          <img src={pcbIcon} alt="pcb-icon"/>
        </Button>
      </DialogTrigger>
      {renderDialogContent()}
    </Dialog>
  );
}
export default PCB;
