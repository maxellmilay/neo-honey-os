import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button"; // Import necessary components
import NotepadDialog from "./Notepad.js"; // Import the dialog component
import notepadIcon from "../../assets/img/notepad icon.png";

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
    // <Dialog>
    //   <DialogTrigger asChild>
        <div id="notepad-button-container">
          <Button id="notepad-button" variant="link" className="transparent" onClick={handleAddDialog}>
            <img src={notepadIcon} alt="notepad-icon" height="100" width="100" />
          </Button>
        </div>
      // </DialogTrigger>
      /* Render additional dialogs */
    //   {renderDialogs()}
    // </Dialog>
  );
}


// Notepad.js

// Notepad.js

export const openNotepad = () => {
  // Find the container element
  const notepadButtonContainer = document.getElementById('notepad-button-container');
  if (notepadButtonContainer) {
    // Find the button inside the container
    const notepadButton = notepadButtonContainer.querySelector('#notepad-button');
    if (notepadButton) {
      // Trigger click on the button
      notepadButton.click();
    } else {
      console.error('Notepad button not found');
    }
  } else {
    console.error('Notepad button container not found');
  }
};



