import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

type DeleteDialogProps = {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

const DeleteDialog = ({ open, title, description, onClose, onConfirm, confirmText = "Delete", cancelText = "Cancel" }: DeleteDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description">
      <DialogTitle id="delete-dialog-title" color="error">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description" color="text.primary">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">{cancelText}</Button>
        <Button onClick={onConfirm} color="error" autoFocus>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
