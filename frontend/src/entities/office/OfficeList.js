import React, { Component } from 'react';
import {SERVER_URL} from '../../config/constants.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ReactTable from "react-table";
import {DataGrid, GridApi, GridCellParams, GridColDef} from '@material-ui/data-grid';

import '../../App.css'
import AddOffice from "./AddOffice";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import EditOffice from "./EditOffice";

class OfficeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            offices: []
        };
    }

    componentDidMount() {
        this.fetchOffices();
    }

    fetchOffices = () => {
        console.log("FETCH")
        fetch(SERVER_URL +'api/offices')
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    offices: responseData,
                    isLoading: false
                });
            })
        .catch(err => console.error(err));
    }

    // Add new Office
    addOffice(office) {
        fetch(SERVER_URL + 'api/offices',
            { method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(office)
            })
            .then(res => this.fetchOffices())
            .catch(err => console.error(err))
    }


    editOffice(office, link){
        fetch(link,
            {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(office)

            }).
            then(res => {
            toast.success("Changes saved", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.fetchCars();
        })
            .catch(err =>
                toast.error("Error when saving", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
    }

 /*   onDelClick = (link) => {
        fetch(link, {method: 'DELETE'})
            .then(res => this.fetchOffices())
            .catch(err => console.error(err))
    }*/

// Delete office
    onDelClick = (link) => {
        if (window.confirm('Are you sure to delete?')) {
            fetch(link, {method: 'DELETE'})
                .then(res => {
                    toast.success("Office deleted", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    this.fetchOffices();
                })
                .catch(err => {
                    toast.error("Error when deleting", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error(err)
                })
        }
    }

    render() {
        // const columns = [{
        //     Header: 'Name',
        //     accessor: 'name'
        // }, {
        //     Header: 'External Id',
        //     accessor: 'externalId',
        // }, {
        //     Header: 'Opening Date',
        //     accessor: 'openingDate',
        // }
        // // , {
        //     // sortable: false,
        //     // filterable: false,
        //     // width: 100
        //     // accessor: '_links.self.href',
        //     // Cell: ({value, row}) => (<EditCar car={row} link={value} updateCar={this.updateCar} fetchCars={this.fetchCars} />),
        // // }, {
        // //     sortable: false,
        // //     filterable: false,
        // //     width: 100
        // //     // accessor: '_links.self.href',
        // //     // Cell: ({value}) => (<button onClick={()=>{this.onDelClick(value)}}>Delete</button>)
        // // }
        //     ]


        const columns :GridColDef[]= [
            { field: 'id', headerName: 'ID'},
            { field: 'name', headerName: 'Name'},
            { field: 'openingDate', headerName: 'Opening Date', width:180 },
            { field: 'externalId', headerName: 'External Id', width: 120},
            { field: 'parentId', headerName: 'Parent Office Id', width:120},
            {
                /*renderCell: (params) => (
                    <strong>
                        {/!*{(params.value as Date).getFullYear()}*!/}
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ marginLeft: 16 }}
                        >
                            Open
                        </Button>
                    </strong>
                ),*/
                // field: "",
                // headerName: "",
                /*sortable: false,
                width: 100,
                disableClickEventBubbling: true,
                renderCell: (params) => {
                    const onClick = () => {
                        const api: GridApi = params.api;
                        const fields = api
                            .getAllColumns()
                            .map((c) => c.field)
                            .filter((c) => c !== "__check__" && !!c);
                        const thisRow = {};

                        fields.forEach((f) => {
                            thisRow[f] = params.getValue(f);
                        });

                        return alert(JSON.stringify(thisRow, null, 4));
                    };
                    return <Button onClick={onClick}>Click</Button>;
                }*/
                field: 'Edit',
                headerName: 'Edit',
                width:'auto',
                /*valueGetter: (params) =>
                    `<a href="${params.getValue("id")}">${params.getValue("id")}</a>`,*/
                renderCell: (params: GridCellParams) => (
                    <div>

                    <EditOffice office={params.row} link={params.value}
                             updateOffice={this.editOffice} fetchOffices={this.fetchOffices} />
                        </div>

                        ),
            },
            {
                field: 'Delete',
                headerName: 'Delete',
                renderCell: (params: GridCellParams) => (
                  /*  <EditOffice office={params.row} link={params.value}
                                updateOffice={this.editOffice} fetchOffices={this.fetchOffices} />*/
                <strong>
                    {/*{(params.value as Date).getFullYear()}*/}
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={(params)=>{this.onDelClick(params.value)}}
                    >
                        Delete
                    </Button>
                </strong>
                )
            }
            ];

        const rows = this.state.offices;

        if (this.state.isLoading) {
            return <p>Loading ...</p>;
        }
        return (
            <div className="App">
                <Grid container>
                    <Grid item>
                        {/*<AddOffice addCar={this.addCar} fetchCars={this.fetchCars} />*/}
                        <AddOffice addOffice={this.addOffice}  fetchOffices={this.fetchOffices} offices={this.state.offices}/>
                    </Grid>
                </Grid>
                <DataGrid autoHeight rows={rows} columns={columns} pageSize={5} checkboxSelection />
            </div>
        );

    }
};

export default OfficeList;