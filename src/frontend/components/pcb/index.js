import React, { useState, useEffect } from "react";
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
  TableHeader,
} from "../../components/ui/table";
import { Copy, FolderOpenDot, FolderOpen, Save, SaveAll } from "lucide-react";
import pcbIcon from "../../assets/img/pcbIcon.png";
import styles from "./pcb.module.css";
import { generateRandomProcessControlBlock } from "./dummydata";
import { ScrollArea } from "../../components/ui/scroll-area";

function PCB() {
  const [dialogCount, setDialogCount] = useState(1);
  const [dialogStates, setDialogStates] = useState(Array.from({ length: 1 }, () => true));
  const [processControlBlocks, setProcessControlBlocks] = useState([]);

  useEffect(() => {
    const generateRandomProcess = () => {
        const newProcess = generateRandomProcessControlBlock(processControlBlocks.length ? processControlBlocks[processControlBlocks.length - 1].id : 0);
        setProcessControlBlocks(prevProcesses => [...prevProcesses, newProcess]);
    };

    const interval = setInterval(generateRandomProcess, 3000);

    return () => clearInterval(interval);
}, [processControlBlocks]);



  const renderDialogContent = () => {
    const dialogContentArray = [];
    for (let i = 0; i < dialogCount; i++) {
      dialogContentArray.push(
        <>
          <Draggable positionOffset={{ x: '-50%', y: '-50%' }}>
            <DialogContent key={i} className="w-fit object-center">
                <DialogHeader>
                  <DialogTitle className="text-s">Process Control Block</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 md:grid-cols-5 lg:grid-cols-5">
                  <div className="flex flex-col col-span-2">
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
                        FCFS
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
                        <>SJF (Preemptive)</>
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
                  
                   <div className="flex flex-col col-span-3">
                    Ready Queue
                    <Table > 
              <ScrollArea className="h-[200px] w-full p-2">
                      <TableHeader  className="sticky z-50 top-0 bg-white drop-shadow-sm">
                        <TableRow>
                          <TableHead>Jobs</TableHead>
                          <TableHead>Status</TableHead></TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          {processControlBlocks.map((process, index) => (
                            <TableRow key={index}>
                              <TableCell>{process.id}</TableCell>
                              <TableCell>{process.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableRow>
                      </TableBody>
                      </ScrollArea>
            </Table>
                  </div>
      {/* TABL HERE */}
      
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
        <Button id="pcbButton" variant="outline" size="appIcon" className={`${styles.appIconButton} transparent`} >
          <img src={pcbIcon} alt="pcb-icon"/>
          <div>PCB</div>
        </Button>
      </DialogTrigger>
      {renderDialogContent()}
    </Dialog>
  );
}

export default PCB;
