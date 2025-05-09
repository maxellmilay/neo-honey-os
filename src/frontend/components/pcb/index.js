// import styles from "./pcb.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Draggable from "react-draggable";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import pcbIcon from "../../assets/img/bee.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"
import PCB from "../../pages/pcb"
import styles from './pcb.module.css';

function BusyBee() {
  const [dialogCount, setDialogCount] = useState(1);
  const [dialogStates, setDialogStates] = useState(
    Array.from({ length: 1 }, () => true)
  );
  const [processControlBlocks, setProcessControlBlocks] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);

  const text = "BusyBee (PCB)";
  const letters = text.split('')

  const renderDialogContent = () => {
    const dialogContentArray = [];
    for (let i = 0; i < dialogCount; i++) {
      dialogContentArray.push(
        <React.Fragment key={i}>
          <Draggable handle=".dialog-title" positionOffset={{ x: '-50%', y: '-56%' }}>
            <DialogContent className={`${styles.dialogContainer} w-[98%] h-[86%] flex`} style={{ position: 'fixed', top: '50', left: '50' }}>
              <div className="w-full">
                <DialogTitle className="flex item-center justify-center">
                  <div style={{ display: 'inline', alignItems: 'center' }} className={`${styles.mahStroke} justify-center dialog-title pt-2 flex flex-col space-y-1.5 text-black mahStroke text-center`}>{letters.map((letter, index) => (
                        <h2
                          key={index} style={{ display: 'inline' }}
                          className={index % 2 === 0 ? "text-yellow-600 text-center" : "text-amber-900 text-center"}
                        >
                          {letter}
                        </h2>
                      ))}
                  </div>
                </DialogTitle>
                  <PCB />
              </div>
            </DialogContent>
          </Draggable>
        </React.Fragment>
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
                  id="pcb-button" 
                  variant="outline" 
                  icon="icon"
                  className={`${styles.appIconButton} transparent`}
                >
                  <img src={pcbIcon} alt="BusyBee (PCB)"/>
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

export const openPCB = () => {
  const pcbButton = document.getElementById('pcb-button');
  if (pcbButton) {
    pcbButton.click();
  } else {
    console.error('PCB button not found');
  }
};

export const closePCB = () => {
  // Find all open dialogs and close them
  const dialogs = document.querySelectorAll('[role="dialog"]');
  dialogs.forEach(dialog => {
    // Find the close button within this dialog
    const closeButton = dialog.querySelector('button[aria-label="Close"], button:has(> svg[data-lucide="x"])');
    if (closeButton) {
      closeButton.click();
    }
  });
};

export default BusyBee;


