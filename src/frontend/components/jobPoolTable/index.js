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
        <>
            {selectedAlgo !== "p" ? (    
                <Table className="w-full h-full"> 
                    <ScrollArea className="h-[25rem] w-auto p-2">
                    <TableHeader className="sticky z-50 top-0 bg-[#FEF8D8] drop-shadow-sm">
                    <TableRow>
                            <TableHead className="text-center text-slate-950 font-bold">Process ID</TableHead>
                            <TableHead className="text-center text-slate-950 font-bold">Arrival</TableHead>
                            <TableHead className="text-center text-slate-950 font-bold">Burst</TableHead>
                            <TableHead className="text-center text-slate-950 font-bold">Memory</TableHead>
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
                            <TableRow key={index} className={index === 0 ? "sticky z-49 top-[35.5px] font-bold text-amber-950 bg-yellow-300" : ""}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.arrivalTime}</TableCell>
                                <TableCell>{item.burst}</TableCell>
                                <TableCell>{item.memory} kb</TableCell>
                            </TableRow>
                        )))}
                    </TableBody>
                    </ScrollArea>
            </Table>
            ) : (
                <Table className="w-full h-full"> 
                    <ScrollArea className="h-[25rem] w-auto p-2">
                    <TableHeader className="sticky z-50 top-0 bg-[#FEF8D8] drop-shadow-sm">
                    <TableRow>
                            <TableHead className="text-center text-slate-950 font-bold">Process ID</TableHead>
                            <TableHead className="text-center text-slate-950 font-bold">Arrival</TableHead>
                            <TableHead className="text-center text-slate-950 font-bold">Burst</TableHead>
                            <TableHead className="text-center text-slate-950 font-bold">Memory</TableHead>
                            <TableHead className="text-center text-slate-950 font-bold">{selectedAlgo === 'p' && "Priority"}</TableHead>
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
                            <TableRow key={index} className={index === 0 ? "sticky z-49 top-[35.5px] font-bold text-amber-950 bg-yellow-300" : ""}>
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
            )}
        </>
    )
}

export default JobPoolTable;