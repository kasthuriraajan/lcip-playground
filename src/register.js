import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import {Row, Col, Card, Button,Form,InputGroup } from 'react-bootstrap';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            username : "",
            password : ""
        }
    }
    handleChange = (event)=> {
        this.setState({[event.target.name]: event.target.value});
    }
    
    handleSubmit = (event)=> {
        const userInfo = {
            tenantId : localStorage.getItem("tenantId"),
            userEmail: this.state.email,
            userName : this.state.username,
            password : this.state.password
        }
        this.setState({
            email:"",
            username : "",
            password : ""
        });   
        this.register(userInfo);
        event.preventDefault();
    }

    register = (userInfo)=>{
        fetch('https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/user',{
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data =>console.log(data));
    this.props.getRegister(true);
    }

    cancel = ()=>{
        this.setState({
            email:"",
            username : "",
            password : ""
        });
        this.props.getRegister(true);
    }

    render(){
        return(
        <Row className="justify-content-md-center login-page">
            <Col lg="4" md="4" sm="4">
            <Card text = "dark" className="text-center" 
            style={{ marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
            <Card.Header>
                <h1> LCIP </h1>
                <p>Light-weight Cloud Identity Provider</p>
            </Card.Header> 
            <Card.Title  style={{ marginTop:'15px'}}><h2>Register Here</h2></Card.Title>
            <hr/>   
                <Form style={{ margin:'15px'}} onSubmit={this.handleSubmit}>
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon='envelope'/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="email" name="email" value={this.state.email} placeholder="Email" 
                        onChange ={this.handleChange} required/>
                    </InputGroup>
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon='user'/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" name="username" value={this.state.username} placeholder="Username" 
                        onChange ={this.handleChange} required/>
                    </InputGroup> 
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon='key'/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" 
                        onChange ={this.handleChange} required/>
                    </InputGroup>
                    <Button variant="secondary" type='button' onClick={this.cancel} size="lg" style={{ margin:'5px'}}>Cancel</Button>
                    <Button variant="success" type='submit' value="Submit" size="lg" >Register</Button>                      
                </Form>
            </Card>
            </Col>
        </Row>
        );
    }
}
export default Register;
