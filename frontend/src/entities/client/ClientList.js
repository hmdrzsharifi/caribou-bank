import React, { Component } from 'react';
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddClient from './AddClient';
import EditClient from './EditClient';
import { CSVLink } from 'react-csv';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {SERVER_URL} from "../../config/constants";

class ClientList extends Component {
  constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            clients: []
        }
    }
    componentDidMount() {
        this.fetchClients();
    }

    fetchClients = () => {
        fetch('http://localhost:8090/api/clients')
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    clients: responseData,
                    isLoading: false
                });
            });
    }

    // Add new Office
    addClient(client) {
        fetch(SERVER_URL + 'api/clients',
            { method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(client)
            })
            .then(res => this.fetchOffices())
            .catch(err => console.error(err))
    }

    editClient(client, link){
        fetch(link,
            {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(client)

            }).
        then(res => {
            toast.success("Changes saved", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.fetchClients();
        })
            .catch(err =>
                toast.error("Error when saving", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
    }

    render() {
    const columns = [ {
      Header: 'Color',
      accessor: 'lastname',
    }, {
      Header: 'Year',
      accessor: 'firstname',
    }, {
      sortable: false,
      filterable: false,
      width: 100,
      accessor: '_links.self.href',
      Cell: ({value, row}) => (<EditClient client={row} link={value} updateCar={this.editClient()} fetchClients={this.fetchClients()} />),
    }, {
      sortable: false,
      filterable: false,
      width: 100,
      accessor: '_links.self.href',
      Cell: ({value}) => (<Button size="small" color="secondary"
        onClick={()=>{this.onDelClick(value)}}>Delete</Button>)
    }]
    return (
      <div className="App">
        <Grid container>
          <Grid item>
            <AddClient addClient={this.addClient} fetchClients={this.fetchClients} />
          </Grid>
          <Grid item style={{padding: 15}}>
            <CSVLink data={this.state.clients} separator=";">Export CSV</CSVLink>
          </Grid>
        </Grid>
        <ReactTable data={this.state.clients} columns={columns}
          filterable={true}/>
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

export default ClientList;