import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {APP_DATE_FORMAT} from "../../config/constants";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime} from "../../util/date-utils";

const EditOffice = (props) => {
    const [open, setOpen] = useState(false);
    const [office, setOffice] = useState({name: '', openingDate: '', externalId: '', parentId:0});
    // const { offices, setOffices } = useState(...props.fetchOffices);
    // const offices = props.fetchOffices;

    const handleClickOpen = () => {
        setOffice({name: props.office.name, openingDate: convertDateTimeFromServer(props.office.openingDate), externalId: props.office.externalId,
            parentId: props.office.parentId })
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setOffice({...office, [event.target.name]: event.target.value});
    }

    // Save car and close modal form
    const handleSave = () => {
        //office.openingDate = convertDateTimeToServer(office.openingDate);
        //props.addOffice(office);
        props.updateOffice(office, props.link);
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
                Edit Office
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Office</DialogTitle>
                <DialogContent>
                    <TextField autoFocus fullWidth label="Name" name="name"
                               value={office.name} onChange={handleChange}/>
                    <TextField fullWidth label="Opening Date" name="openingDate"
                               type="datetime-local"  placeholder={'YYYY-MM-DD HH:mm'}
                               value={office.openingDate} onChange={handleChange}/>
                    {/*value={displayDefaultDateTime()} onChange={handleChange}/>*/}
                    {/*<TextFormat type="date" value={office.openingDate} format={APP_DATE_FORMAT} />*/}
                    <TextField fullWidth label="External Id" name="externalId"
                               value={office.externalId} onChange={handleChange}/>
                    {/*<TextField fullWidth label="Parent" name="parent"
                               value={office.parent} onChange={handleChange}/>*/}

                    {/*     <option value="" key="0" />
                    {offices
                        ? offices.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                                {otherEntity.id}
                            </option>
                        ))
                        : null}*/}
                    {/*
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={office.parent}
                    onChange={handleChange}
                    // labelWidth={labelWidth}
                    >
                      <option value={1}>{offices.toString()}</option>
                      <option value={2}>Second option</option>

                      {offices
                        ? offices.map(otherEntity => (
                        // <MenuItem value={otherEntity.id}>{otherEntity.id}</MenuItem>
                        <option value={otherEntity.id}>{otherEntity.id}</option>
                    ))
                    : null}
                </Select>*/}

                   {/* <Select value={office.parentId} onChange={handleChange} name="parentId">
                        {props.offices.map((option) => (
                            // <option value={option.id}>{option.name}</option>
                            <MenuItem value={option.id} key={option.id}>{option.name}</MenuItem>

                        ))}
                    </Select>*/}

                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditOffice;