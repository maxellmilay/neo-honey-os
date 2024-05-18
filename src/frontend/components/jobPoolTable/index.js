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
            <ScrollArea className="h-[300px] w-auto p-2">
            <TableHeader className="sticky z-50 top-0 bg-slate-100 drop-shadow-sm">
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Arrival Time</TableHead>
                <TableHead>Burst Time</TableHead>
                <TableHead>Memory Size</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>Finish</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Remaining Time</TableHead>
                <TableHead>Turnaround</TableHead>
                <TableHead>Waiting Time</TableHead>
                <TableHead>%</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
                {simulation?.jobs.map((item, index) => (
                <TableRow key={index}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.arrivalTime}</TableCell>
                    <TableCell>{item.burst}</TableCell>
                    <TableCell>{item.priority}</TableCell>
                    <TableCell>{item.startTime}</TableCell>
                    <TableCell>{item.finishTime}</TableCell>
                    <TableCell>{item.remaining}</TableCell>
                    <TableCell>{item.getTurnaroundTime(simulation.time)}</TableCell>
                    <TableCell>{item.getWaitingTime(simulation.time)}</TableCell>
                    <TableCell>{item.percent}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </ScrollArea>
      </Table>
    )
}

export default JobPoolTable;