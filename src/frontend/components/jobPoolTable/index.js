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

function JobPoolTable({ simulation }) {
    return(
        <Table className="w-full h-full"> 
            <ScrollArea className="h-[31rem] w-auto p-2">
            <TableHeader className="sticky z-50 top-0 bg-slate-100 drop-shadow-sm">
            <TableRow>
                <TableHead className="text-center">ID</TableHead>
                <TableHead className="text-center">Arrival</TableHead>
                <TableHead className="text-center">Burst</TableHead>
                <TableHead className="text-center">Memory</TableHead>
                <TableHead className="text-center">Priority</TableHead>
                {/* <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Remaining</TableHead>
                <TableHead className="text-center">Waiting</TableHead>
                <TableHead className="text-center">%</TableHead> */}
            </TableRow>
            </TableHeader>
            <TableBody>
                {simulation?.jobs.map((item, index) => (
                <TableRow key={index}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.arrivalTime}</TableCell>
                    <TableCell>{item.burst}</TableCell>
                    <TableCell>{item.memory} kb</TableCell>
                    <TableCell>{item.priority}</TableCell>
                    {/* <TableCell>Ready or not</TableCell> New, Ready, Running, Waiting, Suspended, Terminated
                    <TableCell>{item.remaining}</TableCell>
                    <TableCell>{item.getWaitingTime(simulation.time)}</TableCell>
                    <TableCell>{item.percent}</TableCell> */}
                </TableRow>
                ))}
            </TableBody>
            </ScrollArea>
      </Table>
    )
}

export default JobPoolTable;