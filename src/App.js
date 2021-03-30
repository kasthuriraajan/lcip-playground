import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import {Row, Col, Card, Button,Form,InputGroup } from 'react-bootstrap';
import Dashboard from './dashboard';
import Login from './login';
import Register from './register';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            isPlayground : true,
            isLoggedIn : false,
            isRegistered : true,
            appId : "",
            tenantName:"",
            email:"",
            username : "",
            password : ""
        }
    }
    handleChange = (event)=> {
        this.setState({[event.target.name]: event.target.value});
    }
    
    handleSubmit = (event)=> {
        localStorage.setItem("tenantId", this.state.tenantName);
        localStorage.setItem("appId", this.state.appId);
        this.setState({
            isPlayground : false,
            appId : "",
            tenantName:""
        });
        event.preventDefault();
    }

    setLogin = (resp) =>{
        localStorage.setItem("isLoggedin", resp);
        this.setState({isLoggedIn : resp, isPlayground : true,});
    }
    logout = (resp) => {
        localStorage.clear();
        localStorage.setItem("isLoggedin", resp);
        this.setState({
            isLoggedIn : false,
            isPlayground : true
        })
    }

    register = (resp)=>{
        this.setState({isRegistered:resp});
    }
    clear = ()=>{
        localStorage.clear();
        this.setState({
            appId : "",
            tenantName:""
        });
    }
    
    render(){        
        var isPlayground = this.state.isPlayground;
        var isRegistered = this.state.isRegistered;
        var form = isRegistered?<Login goToRegisterPage= {this.register} loginState = {this.setLogin}/> : 
                    <Register getRegister={this.register}/>
                    

        var playground = (
            <Row className="justify-content-md-center app-page">
            <Col lg="4" md="4" sm="4">
            <Card text = "dark" className="text-center" 
            style={{ marginRight:'5px', borderColor:'black'}}>
            <Card.Header>
                <h1> LCIP - Playground</h1>
                <p>A Light-weight Cloud Identity provider</p>
            </Card.Header> 
            <Card.Title  style={{ marginTop:'15px'}}><h2>App Details</h2></Card.Title>
                <Form style={{ margin:'15px'}} onSubmit={this.handleSubmit}>
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon='university'/> </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" name="tenantName" value={this.state.tenantName} placeholder="Tenant Name" 
                        onChange ={this.handleChange} required/>
                    </InputGroup>
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon='layer-group'/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" name="appId" value={this.state.appId} placeholder="Application ID" 
                        onChange ={this.handleChange} required/>
                    </InputGroup> 
                    <br/>
                    <Button variant="secondary" type='button' onClick={this.clear} size="lg" style={{ margin:'5px'}}>Clear</Button>
                    <Button variant="success" type='submit' value="Submit" size="lg" >Go to Login</Button>                      
                </Form>
            </Card>
            </Col>
        </Row>
        );
        return(
            <div>
               {(localStorage.getItem("isLoggedin")==='true')?<Dashboard loginState={this.logout}/> : <>{(isPlayground? playground : form )}</>}
            </div>
        
        );
    }
}
export default App;
