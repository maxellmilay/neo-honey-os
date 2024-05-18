import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"
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
import { Card, CardHeader, CardContent, CardBody, CardFooter } from "../../components/ui/card";
import { Copy, FolderOpenDot, FolderOpen, Save, SaveAll } from "lucide-react";
import pcbIcon from "../../assets/img/pcbIcon.png";
import styles from "./pcb.module.css";
import { generateRandomProcessControlBlock } from "../../components/pcb/dummydata";
import { ScrollArea } from "../../components/ui/scroll-area";

function PCB() {

    const navigate = useNavigate();

    return (
        <>
        <div className="grid grid-cols-3 items-center w-screen py-2">
            <h2 className="col-start-2 col-end-3 text-center">BusyBee</h2> 
            <div className="col-start-3 col-end-4 text-right">
                <Button variant="icon" onClick={()=>navigate('/desktop')}><Cross2Icon /></Button>
            </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-4 relative flex bg-orange-50 h-auto w-full p-5 justify-center items-center rounded-lg gap-4 box-shadow-lg">     
            <div className="col-span-2">
            <Card className="bg-slate-100 h-full">
                <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>Data</h4></CardHeader>
                <CardContent className="justify-center items-center h-[100px] py-2 grid grid-cols-5">
                    <div>
                        <p>No. of Jobs</p>
                        <p><b className="text-2xl">6999</b></p>
                    </div>
                    <div className="justify-center items-center">
                        <p>Algorithm</p>
                        <Select>
                            <SelectTrigger className="h-1/4 w-full">
                                <SelectValue placeholder="Select a policy" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value = "FCFS">First Come, First Served</SelectItem>
                                    <SelectItem value = "SJF">Shortest Job First</SelectItem>
                                    <SelectItem value = "Priority">Priority</SelectItem>
                                    <SelectItem value = "Round Robin">Round Robin</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <p>Quantum</p>
                        <p><b className="text-2xl">6999</b></p>
                    </div>
                    <div className="col-span-2">
                        <div className = "gap-2">
                            <button>Start</button>
                            <button>Stop</button>
                            <button>Pause</button>
                            <button>Next</button>
                        </div>
                        <div className = "gap-2">
                            <button>Create New Task</button>
                            <button>Start Simulation</button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            </div>
            <div>
            <Card className="bg-slate-100 h-full">
                <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>CPU</h4></CardHeader>
                <CardContent className="justify-center items-center h-[100px] py-2 grid grid-cols-4">
                    <div>
                        <p>Current Job</p>
                        <p><b className="text-2xl">6999</b></p>
                    </div>
                    <div>
                        <p>Current Time</p>
                        <p><b className="text-2xl">6999</b></p>
                    </div>
                    <div>
                        <p>Idle Time</p>
                        <p><b className="text-2xl">6999</b></p>
                    </div>
                    <div>
                        <p>Utilization</p>
                        <p><b className="text-2xl">69.99%</b></p>
                    </div>
                </CardContent>
            </Card>
            </div>
            <div className="h-full row-span-2 col-span-2">
            <Card className="bg-slate-100 h-full">
                <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>Job Pool (PCB)</h4></CardHeader>
                <CardContent>Test</CardContent>
            </Card>
            </div>
            <div className="h-full row-span-1 col-span-1">
            <Card className="bg-slate-100 h-full">
                <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>Average</h4></CardHeader>
                <CardContent className="justify-center items-center h-[100px] py-2 grid grid-cols-2">
                    <div>
                        <p>Waiting</p>
                        <p><b className="text-2xl">6999</b></p>
                    </div>
                    <div>
                        <p>Turnaround Time</p>
                        <p><b className="text-2xl">6999</b></p>
                    </div>
                    </CardContent>
            </Card>
            </div>
            <div className="h-full row-span-1 col-span-1">
            <Card className="bg-slate-100 h-full">
                <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>Ready Queue</h4></CardHeader>
                <CardContent>Test</CardContent>
            </Card>
            </div>
            <div className="col-span-3">
            <Card className="bg-slate-100 h-full">
                <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>Gantt Chart</h4></CardHeader>
                <CardContent>Test</CardContent>
            </Card>
            </div>
        </div>
        </>
    );
}

export default PCB;