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
        <>
        <div className="grid grid-cols-3 items-center w-screen">
            <h3 className="col-start-2 col-end-3 text-center">BusyBee PCB</h3> 
            <div className="col-start-3 col-end-4 text-right">
                <Button variant="icon" onClick={()=>navigate('/desktop')}><Cross2Icon /></Button>
            </div>
        </div>
        <div className="bg-white h-60 w-screen">            
            test
        </div>
        </>
    );
}

export default PCB;