import React, { Component } from 'react';
import { Table, Navbar, Nav, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwt_decode from "jwt-decode";

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
          dashboardContent : "USERS"
        }
      }
    logout=()=>{
        this.props.loginState(false);
    }
    render(){
        var accesstoken = localStorage.getItem("token");
        var appName = "";
        var tenantName = "";
        var expiration = "";

        var decoded = jwt_decode(accesstoken);
        if(decoded !=null){
            appName = decoded['Application Name'];
            tenantName = decoded['Organization Name'];
            expiration = new Date(decoded['exp']*1000).toUTCString();
            console.log(decoded);
        } 
        else{
            console.log("Not a valid token");
        }

        return(
        <div>
{/*------------------------------- Navbar ------------------------------------- */}
        <Navbar bg="dark" variant="dark" sticky="top" >
            <Navbar.Brand href="#home"><h1>Demo App </h1></Navbar.Brand>
             <Nav className="ml-auto">
                <Navbar.Brand>This is a demo application</Navbar.Brand> 
                <Button variant="danger" type='button' onClick={this.logout}>Logout</Button>
            </Nav>                   
        </Navbar>
{/*------------------------------- Body ------------------------------------- */}
        <Card text = "dark" className="text-left" 
            style={{ minHeight: '50rem' ,  marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
            <Card.Header><h2><FontAwesomeIcon icon="university" />  Your Details</h2></Card.Header> 
            <Card.Text>
                <Table responsive>
                    <tbody>
                        <tr>
                            <td>Your Access Token</td>
                            <td>{accesstoken}</td>
                        </tr>
                        <tr>
                            <td>Organization</td>
                            <td>{tenantName}</td>
                        </tr>
                        <tr>
                            <td>Application</td>
                            <td>{appName}</td>
                        </tr>
                        <tr>
                            <td>Expires at</td>
                            <td>{expiration}</td>
                        </tr>
                    </tbody>
                </Table>  
            </Card.Text>  
        </Card>

{/*------------------------------- Footer ------------------------------------- */}
        <Navbar bg="dark" variant="dark" fixed="bottom" className="justify-content-center">
            <Navbar.Brand >Copyright&#169; 2021</Navbar.Brand>
        </Navbar>
                
    </div>
        );
    }
}
export default Dashboard;
