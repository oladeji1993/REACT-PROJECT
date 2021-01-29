import React, { Component } from 'react';
import axios from 'axios';
import Select from "react-select";
// import "react-select/dist/react-select.css";
import ReactTable from "react-table"; 
import 'react-table/react-table.css'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      filtered: [],
      // setTableData,
      loading:true,
      select2: undefined
    }
  }

  async getUsersData(){
    const res = await axios.get('https://api.enye.tech/v1/challenge/records')
    console.log(res.data.records.profiles)
    this.setState({loading:false, users: res.data.records.profiles})
  }
  componentDidMount(){
    this.getUsersData()
  }


  // filter session
  onFilteredChangeCustom = (value, accessor) => {
    let filtered = this.state.filtered;
    let insertNewFilter = 1;

    if (filtered.length) {
      filtered.forEach((filter, i) => {
        if (filter[" "] === accessor) {
          if (value === "" || !value.length) filtered.splice(i, 1);
          else filter["value"] = value;

          insertNewFilter = 0;
        }
      });
    }

    if (insertNewFilter) {
      filtered.push({ id: accessor, value: value });
    }

    this.setState({ filtered: filtered });
  };

  render() {
    const { users } = this.state;
    return (
      <div>
        {/* <pre>{JSON.stringify(this.state.filtered, null, 2)}</pre> */}
        <h1 className="header">WELCOME TO ENYE.TECH USERS RECORD</h1>
        <br />
        <br />
        Global search with FirstName :{" "}
        <Select
          style={{ width: "10%", marginBottom: "20px" }}
          onChange={entry => {
            this.setState({ select2: entry });
            this.onFilteredChangeCustom(
              entry.map(o => {
                return o.value;                 
              }),
              "FirstName"
            );
          }}
          value={this.state.select2}
          isMulti
          options={this.state.users.map((o, i) => {
            return { users: i, value: o.FirstName, label: o.FirstName };
          })}
        />
        <ReactTable 
        data={this.state.users}  
        // columns={columns}
      
        filterable
        filtered={this.state.filtered}
        onFilteredChange={(filtered, column, value) => {
          this.onFilteredChangeCustom(value, column.id || column.accessor);
        }}
        defaultFilterMethod={(filter, row, column) => {
          const id = filter.pivotId || filter.id;
          if (typeof filter.value === "object") {
            return row[id] !== undefined
              ? filter.value.indexOf(row[id]) > -1
              : true;
          } else {
            return row[id] !== undefined
              ? String(row[id]).indexOf(filter.value) > -1
              : true;
          }
        }}

          columns={[
              {
                  Header: "FirstName",
                  accessor: "FirstName"
                },
                {
                  Header: "LastName",
                  accessor: "LastName"
                },
  
                {  
                Header: 'GENDER',  
                accessor: 'Gender' ,
                }
  
                ,{  
                Header: ' LATITUDE',  
                accessor: 'Latitude',
                },
  
                {  
                  Header: 'LONGITUDE',  
                accessor: 'Longitude',
                },
  
                {  
                  Header: 'LASTLOGIN',  
                  accessor: 'LastLogin',
                },
  
                {
                  Header: 'PAYMENTMETHOD',  
                  accessor: 'PaymentMethod',
                },
  
                {
                  Header: 'PHONENUMBER',  
                accessor: 'PhoneNumber',
                },
  
                {
                  Header: 'URL',  
                  accessor: 'URL',
                },
            
                {
                  Header: 'USERNAME',  
                  accessor: 'UserName',
                }
                ,
                {
                  Header: 'CREDITCARDNUMBER',  
                  accessor: 'CreditCardNumber',
                },
            
                {
                  Header: 'EMAIL',  
                  accessor: 'Email',
                },
            
                {
                  Header: 'DOMAINNAME',  
                  accessor: 'DomainName',
                },
            
                {
                  Header: 'CREDITCARDTYPE',  
                  accessor: 'CreditCardType',
                },
            
                {
                  Header: "MACADDRESS",
                  accessor: "MacAddress"
                }
                 
                ]}
          defaultPageSize={20}
          className="-striped -highlight"
        />
      </div>
    );
  }
}
export default App;
