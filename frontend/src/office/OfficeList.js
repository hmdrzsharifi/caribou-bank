import React, { Component } from 'react';
// import ReactTable from "react-table";
import { DataGrid } from '@material-ui/data-grid';

import {SERVER_URL} from '../constants.js'

import '../App.css'
import AddOffice from "./AddOffice";
import Grid from "@material-ui/core/Grid";

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

    // Add new car
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


        const columns = [
            { field: 'id', headerName: 'ID'},
            { field: 'name', headerName: 'Name'},
            { field: 'openingDate', headerName: 'Opening Date' },
            { field: 'externalId', headerName: 'External Id'}
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
                        <AddOffice addOffice={this.addOffice}  />
                    </Grid>
                </Grid>
                <DataGrid autoHeight rows={rows} columns={columns} pageSize={5} checkboxSelection />
            </div>
        );

    }
};

export default OfficeList;