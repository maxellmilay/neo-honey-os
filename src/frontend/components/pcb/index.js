// import styles from "./pcb.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Copy, FolderOpenDot, FolderOpen, Save, SaveAll } from "lucide-react";
import pcbIcon from "../../assets/img/bee.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import PCB3 from "../../pages/pcb/another"
import PCB2 from "../../pages/pcb"
import PCB1 from "../../pages/pcb/test"
import VirtualMemory from "./VirtualMemory";
import styles from './pcb.module.css';

function PCB() {
  let navigate = useNavigate();
  const [dialogCount, setDialogCount] = useState(1);
  const [dialogStates, setDialogStates] = useState(
    Array.from({ length: 1 }, () => true)
  );
  const [processControlBlocks, setProcessControlBlocks] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false); // State to manage dialog visibility


  const renderDialogContent = () => {
    const dialogContentArray = [];
    for (let i = 0; i < dialogCount; i++) {
      dialogContentArray.push(
        <>
          <Draggable handle=".dialog-title" positionOffset={{ x: '-50%', y: '-56%' }}>
            <DialogContent key={i} className={`${styles.dialogContainer} w-[98%] h-[86%] flex`} style={{ position: 'fixed', top: '50', left: '50' }}>
              <div className="w-full">
              {/* For TABS, Scheduler and Virtual Memory */}
              {/* <Tabs defaultValue="Scheduler" className="w-full"> */}
                <DialogTitle>
                  <h2 className={`${styles.mahStroke} dialog-title pt-2 flex flex-col space-y-1.5 text-black mahStroke text-center`}>
                    BusyBee (PCB)
                  </h2>
                  
                </DialogTitle>
                {/* <TabsList>
                  <TabsTrigger value="Scheduler">Scheduler</TabsTrigger>
                  <TabsTrigger value="Virtual Memory">Virtual Memory</TabsTrigger>
                </TabsList>
                <TabsContent value="Scheduler">
                  <PCB3 />
                </TabsContent>
                <TabsContent value="Virtual Memory">
                  <VirtualMemory />
                </TabsContent>
              </Tabs> */}
                  <PCB3 />
              </div>
            </DialogContent>
          </Draggable>
        </>
      );
    }
    return dialogContentArray;
  };

  return (
    <TooltipProvider>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  id="pcbButton" 
                  variant="outline" 
                  icon="icon"
                  className={`${styles.appIconButton} transparent`}
                >
                  <img src={pcbIcon} alt="notepad-icon"/>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                BusyBee (PCB)
              </TooltipContent>
            </Tooltip>
          </div>
        </DialogTrigger>
        {renderDialogContent()}
      </Dialog>
    </TooltipProvider>
  );
}
export default PCB;


