import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import {Row, Col, Card, Button,Form,InputGroup } from 'react-bootstrap';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            isLoginProcess : false
        }
    }
    handleChange = (event)=> {
        this.setState({[event.target.name]: event.target.value});
    }
    
    handleSubmit = (event)=> {
        const loginInfo = {
            tenantId : localStorage.getItem("tenantId"),
            appName : localStorage.getItem("appId"),
            userName :this.state.username,
            password : this.state.password,
            expiryDate : this.getExpiryDate(),
            scopes: "['consumer']"
        }

        fetch('https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/token/generate',{
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(loginInfo)
        })
        .then(res => res.json())
        .then(data =>this.login(data));

        this.setState({username:"", password:"",isLoginProcess:true});

        event.preventDefault();
    }

    login = (resp)=>{
        if ('key' in resp){
            this.setState({isLoginProcess:false});
            localStorage.setItem("token",resp.key);
            this.props.loginState(true);
        }
        else{
            if ('Message' in resp){
                alert(resp.Message);
            }
            else{
                console.log(resp);
            } 
            this.setState({isLoginProcess:false});          
        }
    }

    toRegister = ()=>{
        this.props.goToRegisterPage(false);
    }

    cancel = ()=>{
        this.setState({
            username : "",
            password : ""
        });
        localStorage.clear();
        this.props.loginState(false);
    }

    getExpiryDate = ()=>{
        var expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth()+1);
        var pre =expiryDate.toISOString().split("T"); 
        var suff = expiryDate.toUTCString().split(expiryDate.getFullYear());
        var finalExpiryDate = pre[0]+suff[1];
        return finalExpiryDate;
    }

    render(){
        return(
            <Row className={ this.state.isLoginProcess? "justify-content-md-center login-page loader2" : "justify-content-md-center login-page" } >
                <Col lg="4" md="4" sm="4">
                <Card text = "dark" className="text-center" 
                style={{ marginRight:'5px', borderColor:'black'}}>
                <Card.Header>
                    <h1> LCIP </h1>
                    <p>Light-weight Cloud Identity Provider</p>
                </Card.Header> 
                <Card.Title  style={{ marginTop:'15px'}}><h2>Login</h2></Card.Title>
                {/* <hr/>    */}
                    <Form style={{ margin:'15px'}} onSubmit={this.handleSubmit}>
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
                            <Form.Control type="password"name="password" value={this.state.password} placeholder="Password"
                            onChange ={this.handleChange} required/>
                        </InputGroup>
                        <Button variant="secondary" type='button' onClick={this.cancel} size="lg" style={{ margin:'5px'}}>Cancel</Button>
                        <Button variant="primary" type="submit" value="Submit" size="lg">Login</Button>
                        { this.state.isLoginProcess && (
                               <>
                                <br/>
                                <Button className="buttonload2" >
                                    <i class="fa fa-refresh fa-spin"/>
                                        Login process is happening
                                </Button>
                               </>
                            )
                        }                 
                    </Form>
                    <Card.Footer className="text-muted">Are you new to LCIP ? <Button variant="secondary" 
                         type='button' size="lg" onClick={this.toRegister}>Register Here</Button></Card.Footer>
                </Card>
                </Col>
            </Row>
        );
    }
}
export default Login;
