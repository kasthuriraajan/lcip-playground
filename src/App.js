import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import {Row, Col, Card, Button,Form,InputGroup } from 'react-bootstrap';
import Login from './login';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            isPlayground : true,
            isLoggedIn : false,
            isRegistered : true,
            appId : "A001",
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
        alert('Tenant : '+ this.state.tenantName+'App Id: ' + this.state.appId);
        this.setState({isPlayground : false});
        // const tenantInfo ={
        //     tenantName : this.state.tenantName,
        //     appId : this.state.appId
        // }        
        // this.createTenant(tenantInfo);
        event.preventDefault();
    }

    setLogin = (resp) =>{
        this.setState({isLoggedIn : resp});
    }
    logout = () => {
        this.setState({
            isLoggedIn : false,
            isPlayground : true
        })
    }

    // createTenant = (tenantInfo)=>{
    //     fetch('http://localhost:9090/echo',{
    //     method: 'POST',
    //     headers: {
    //         'content-type':'application/json'
    //     },
    //         body: JSON.stringify(tenantInfo)
    //     })
    //     .then(res => res.json())
    //     .then(data =>console.log(data));
    //     const userInfo = {
    //         tenantId : "T001",
    //         userEmail: this.state.email,
    //         userName : this.state.username,
    //         password : this.state.password
    //     }
    //     // this.register(userInfo);
    // }

    register = (resp)=>{
    //     fetch('http://localhost:9090/echo',{
    //     method: 'POST',
    //     headers: {
    //         'content-type':'application/json'
    //     },
    //     body: JSON.stringify(userInfo)
    // })
    // .then(res => res.json())
    // .then(data =>console.log(data));
        this.setState({isRegistered:resp});
    }

    render(){
        var isPlayground = this.state.isPlayground;
        var isLoggedIn = this.state.isLoggedIn;
        var dashboard = (
            <div>
                <h1>User app Dashboard</h1>
                <Button variant="danger" type='button' onClick={this.logout}>Logout</Button>
            </div>);
        var playground = (
            <Row className="justify-content-md-center">
            <Col lg="4" md="4" sm="4">
            <Card text = "dark" className="text-center" 
            style={{ marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
            <Card.Header>
                <h1> LCIP - Playground</h1>
                <p>A Light-weight Cloud Identity provider</p>
            </Card.Header> 
            <Card.Title  style={{ marginTop:'15px'}}><h2>Get Your Tokens</h2></Card.Title>
            <hr/>   
                <Form style={{ margin:'15px'}} onSubmit={this.handleSubmit}>
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon='university'/> </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" name="tenantName" value={this.state.tenantName} placeholder="Tenant Name" 
                        onChange ={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon='layer-group'/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" name="appId" value={this.state.appId} placeholder="Application ID" 
                        onChange ={this.handleChange}/>
                    </InputGroup> 
                    <Button variant="secondary" type='button' size="lg" style={{ margin:'5px'}}>Clear</Button>
                    <Button variant="success" type='submit' value="Submit" size="lg" >Go to Login</Button>                      
                </Form>
            </Card>
            </Col>
        </Row>
        );
        return(
            <div>
               {isLoggedIn?dashboard : (isPlayground? playground : <Login goToRegisterPage= {this.register} loginState = {this.setLogin}/>)}
            </div>
        
        );
    }
}
export default App;
