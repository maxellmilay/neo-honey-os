import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button"; // Import necessary components
import NotepadDialog from "./Notepad.js"; // Import the dialog component

export function Notepad() {
  const [dialogCount, setDialogCount] = useState(1);

  const renderDialogs = () => {
    const dialogs = [];
    for (let i = 0; i < dialogCount; i++) {
      dialogs.push(
          <NotepadDialog key={`dialog_${i}`}/>
      );
    }
    return dialogs;
  };

  const handleAddDialog = () => {
    setDialogCount(prevCount => prevCount + 1);
  };

  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button id="notepad-button" variant="destructive" size="icon" className="transparent" onClick={handleAddDialog}>
            {/* <img src={notepadIcon} alt="notepad-icon" height="100" width="100" /> */}
            Nla
        </Button>
      </DialogTrigger>
      {renderDialogs()}
    </Dialog>
  );
}

export const openNotepad = () => {
  // Find and click the Notepad button
  const notepadButton = document.getElementById('notepad-button');
  if (notepadButton) {
    notepadButton.click();
  } else {
    console.error('Notepad button not found');
  }
};

export const closeNotepad = () => {
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



