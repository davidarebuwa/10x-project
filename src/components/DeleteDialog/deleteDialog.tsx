import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DeleteDialogProps {
	isOpen: boolean;
	handleClose: () => void;

}

const DeleteDialog = ({isOpen, handleClose} : DeleteDialogProps) => {
	const [open, setOpen] = useState(false);

	const handleDelete = () => {
		setOpen(false);
	};

	useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);
	
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{"Delete User?"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Please confirm if you would like to delete user from the system.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>
					Cancel
				</Button>
				<Button onClick={handleDelete} autoFocus>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
  	);
}

export default DeleteDialog;