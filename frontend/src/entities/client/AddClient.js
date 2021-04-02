import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const AddClient = (props) => {
    const [open, setOpen] = useState(false);
    const [client, setClient] = useState({firstname: '', lastname: ''});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setClient({...client, [event.target.name]: event.target.value});
    }

    // Save Client and close modal form
    const handleSave = () => {
        props.addClient(client);
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
                New Client
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Client</DialogTitle>
                <DialogContent>
                    <TextField autoFocus fullWidth label="Brand" name="brand"
                               value={client.firstname} onChange={handleChange}/>
                    <TextField fullWidth label="Model" name="model"
                               value={client.lastname} onChange={handleChange}/>
                    {/*<TextField fullWidth label="Color" name="color"
                               value={client.color} onChange={handleChange}/>
                    <TextField fullWidth label="Year" name="year"
                               value={client.year} onChange={handleChange}/>
                    <TextField fullWidth label="Price" name="price"
                               value={client.price} onChange={handleChange}/>*/}
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddClient;