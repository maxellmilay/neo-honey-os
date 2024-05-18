import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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
import { Cross2Icon } from "@radix-ui/react-icons";
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
import { generateRandomProcessControlBlock } from "../../components/pcb/dummydata";
import { ScrollArea } from "../../components/ui/scroll-area";

function PCB() {

    const navigate = useNavigate();

    return (
        <div>
            <h3>BusyBee PCB</h3>
            <div className="flex flex-col">
                <div className="mb-2">
                <Button variant = "icon" onClick={()=>navigate('/desktop')}><Cross2Icon /></Button>
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
        </div>
    );
}

export default PCB;