import axios from "axios";
import Button from 'react-bootstrap/button';
import { useHistory } from "react-router";
import { useState } from "react";
import { Container, Form, Row } from "react-bootstrap";

function Login() {
    const history = useHistory()
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const submitLogin = (e) => {
        e.preventDefault()
        axios.post('/login', {
            username: username,
            password: password
        }).then(() => history.push('/'))
    }

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <h1>Login</h1>
            </Row>
            <Row className='col-6 offset-3 justify-content-md-center'>
                <Form className='container mt-4' onSubmit={submitLogin}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Log in
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default Login;