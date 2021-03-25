import React, { Component } from 'react';
import './App.css'

class ClientList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            clients: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8090/api/clients')
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    clients: responseData,
                    isLoading: false
                });
            });
    }

    render(){
        if (this.state.isLoading){
           return <p>Loading ...</p>;
        }
        return (
          <div className="App">
              <p>Clients: {this.state.clients.firstname}</p>
          </div>
        );
    }
}

export default ClientList;