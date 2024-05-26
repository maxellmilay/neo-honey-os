import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "../../components/ui/table";
import styles from "./pcb.module.css";
import { ScrollArea } from "../../components/ui/scroll-area";

function JobPoolTable({ simulation, selectedAlgo }) {
    return(
        <Table className="w-full h-full"> 
            <ScrollArea className="h-[25rem] w-auto p-2">
            <TableHeader className="sticky z-50 top-0 bg-slate-100 drop-shadow-sm">
            <TableRow>
                <TableHead className="text-center font-bold">Process ID</TableHead>
                <TableHead className="text-center font-bold">Arrival</TableHead>
                <TableHead className="text-center font-bold">Burst</TableHead>
                <TableHead className="text-center font-bold">Memory</TableHead>
                <TableHead className="text-center font-bold">{selectedAlgo === 'p' && "Priority"}</TableHead>
                {/* <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Remaining</TableHead>
                <TableHead className="text-center">Waiting</TableHead>
                <TableHead className="text-center">%</TableHead> */}
            </TableRow>
            </TableHeader>
            <TableBody>
                {([...(simulation?.jobs || [])] // Provide a default value
                .sort((a, b) => {
                    if (a === simulation.currentJob) return -1;
                    if (b === simulation.currentJob) return 1;
                    return a.id - b.id;
                })
                .map((item, index) => (
                    <TableRow key={index} className={index === 0 ? "font-bold bg-white" : ""}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.arrivalTime}</TableCell>
                        <TableCell>{item.burst}</TableCell>
                        <TableCell>{item.memory} kb</TableCell>
                        <TableCell>{selectedAlgo === 'p' && item.priority}</TableCell>
                    </TableRow>
                )))}
            </TableBody>
            </ScrollArea>
      </Table>
    )
}

export default JobPoolTable;