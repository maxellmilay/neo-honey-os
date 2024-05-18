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
import { ScrollArea } from "../../components/ui/scroll-area";

function jobPoolTable() {
    return(
        <Table> 
        <ScrollArea className="h-[200px] w-full p-2">
        <TableHeader className="sticky z-50 top-0 bg-white drop-shadow-sm">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Arrival Time</TableHead>
            <TableHead>Burst Time</TableHead>
            <TableHead>Memory Size</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>Finish</TableHead>
            <TableHead>Remaining Time</TableHead>
            <TableHead>Turnaround</TableHead>
            <TableHead>Waiting Time</TableHead>
            <TableHead>%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

        </TableBody>
        </ScrollArea>
      </Table>
    )
}

export default jobPoolTable;