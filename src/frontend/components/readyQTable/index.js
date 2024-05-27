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

function ReadyQTable({ simulation }) {
    return(
        <Table className="w-full h-full" style={{ maxHeight: '88%' }}> 
            <ScrollArea className="h-[20rem] w-auto p-2">
            <TableHeader className="sticky z-50 top-0 bg-slate-100 drop-shadow-sm">
            <TableRow className="font-bold h-4">
                <TableHead className="text-center font-bold">Process ID</TableHead>
                <TableHead className="text-center font-bold">Status</TableHead>
                <TableHead className="text-center font-bold">Remaining</TableHead>
                {/* <TableHead className="text-center font-bold">Waiting</TableHead> */}
                <TableHead className="text-center font-bold">%</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
                {simulation?.jobs.map((item, index) => (
                <TableRow key={index} className={ index === 0 ? "font-bold bg-white rowTb" : "rowTb"}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.status}</TableCell> {/* New, Ready, Running, Waiting, Suspended, Terminated */}
                    <TableCell>{item.remaining}</TableCell>
                    {/* <TableCell>{item.getWaitingTime(simulation.time)}</TableCell> */}
                    <TableCell>{item.percent}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </ScrollArea>
      </Table>
    )
}

export default ReadyQTable;