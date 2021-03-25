import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const AddOffice = (props) => {
    const [open, setOpen] = useState(false);
    const [office, setOffice] = useState({name: '', openingDate: '', externalId: '', parent:''});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setOffice({...office, [event.target.name]: event.target.value});
    }

    // Save car and close modal form
    const handleSave = () => {
        props.addOffice(office);
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
                New Office
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Office</DialogTitle>
                <DialogContent>
                    <TextField autoFocus fullWidth label="Name" name="name"
                               value={office.name} onChange={handleChange}/>
                    <TextField fullWidth label="Opening Date" name="openingDate"
                               value={office.openingDate} onChange={handleChange}/>
                    <TextField fullWidth label="External Id" name="externalId"
                               value={office.externalId} onChange={handleChange}/>
                    <TextField fullWidth label="Parent" name="parent"
                               value={office.parent} onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddOffice;