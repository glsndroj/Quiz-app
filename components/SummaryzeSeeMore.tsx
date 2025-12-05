import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ContentProps {
  initialContent: string | null;
  articleTitle: string | null;
}

export function FullContentDialog({
  initialContent,
  articleTitle,
}: ContentProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="font-semibold cursor-pointer">See more</p>
      </DialogTrigger>
      <DialogContent className="w-[800px]  max-h-[400px] p-10 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{articleTitle}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">{initialContent}</div>
        </div>
        <DialogFooter className="flex justify-end">
          <DialogClose asChild>
            <Button
              className="cursor-pointer"
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
