import React, { Component } from 'react';
import { Table, Navbar, Nav, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwt_decode from "jwt-decode";

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
          dashboardContent : "USERS",
          verificationMsg : ""
        }
      }
    logout=()=>{
        this.props.loginState(false);
    }
    verifyToken = ()=>{
        const tokenInfo = {
            token : localStorage.getItem("token")
        }
        fetch('https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev//token/validate',{
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(tokenInfo)
        })
        .then(res => res.json())
        .then(data =>this.verify(data));
    }
    reset = () => {
        this.setState({verificationMsg :""});
    }
    verify = (data)=>{
        if('status' in data){
            this.setState({verificationMsg :data.status});
        }
        else{
            if('Message' in data){
                this.setState({verificationMsg :data.Message});
            }
            else{
                this.setState({verificationMsg :data});
                console.log(data)
            }
        }        
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
        } 
        else{
            console.log("Not a valid token");
        }

        return(
        <div>
{/*------------------------------- Navbar ------------------------------------- */}
        <Navbar variant="dark" sticky="top" className="primaryNav">
            <Navbar.Brand href="#home"><h1>Demo App </h1></Navbar.Brand>
             <Nav className="ml-auto">
                <Navbar.Brand className="profile">This is a Demo Application</Navbar.Brand> 
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
                 {this.state.verificationMsg===""?<Button size="lg" onClick={this.verifyToken} style={{ margin:'5px'}}>Verify Token</Button>:
                 <Button size="lg" onClick={this.reset} style={{ margin:'5px'}}>Ok</Button>} <h2> {this.state.verificationMsg}</h2>
            </Card.Text>  
        </Card>

{/*------------------------------- Footer ------------------------------------- */}
        <Navbar variant="dark" fixed="bottom" className="justify-content-center primaryNav">
            <Navbar.Brand >Copyright&#169; 2021</Navbar.Brand>
        </Navbar>
                
    </div>
        );
    }
}
export default Dashboard;
