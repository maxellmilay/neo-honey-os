import styles from "./notepad.module.css";
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
import { Copy } from "lucide-react";
import notepadIcon from "../../assets/img/notepad icon.png";
import { FolderOpen } from "lucide-react";
function Notepad() {
  return (
    //     <div className={`${styles.container}`}>
    //         <h6>Notepad</h6>
    //       <button className={`${styles.button} absolute`}>
    //         <p className="">File</p>
    //       </button>
    //       <textarea
    //         className={`${styles.notepad}`}
    //         placeholder="Start typing here..."
    //       ></textarea>
    //     </div>

    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <img src={notepadIcon} alt="notepad-icon" height="100" width="100" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full h-full">
        <DialogHeader>
          <DialogTitle className="text-s">Notepad</DialogTitle>
        </DialogHeader>
<div>           <DialogClose asChild><Button>
      <FolderOpen className="mr-2 h-4 w-4" /> Open a new file
    </Button></DialogClose></div>
    
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default Notepad;
