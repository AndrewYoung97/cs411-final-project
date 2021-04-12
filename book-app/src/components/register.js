import axios from "axios";
import Button from 'react-bootstrap/button';
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { Container, Form, Row } from "react-bootstrap";

function Register(props) {
    const history = useHistory()
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const [success, setSuccess] = useState(false)

    const submitRegister = (e) => {
        e.preventDefault()
        axios.post('/register', {
            username: username,
            password: password,
            email: email
        }).then(() => history.push('/'))
    }

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <h1>Login</h1>
            </Row>
            <Row className='col-6 offset-3 justify-content-md-center'>
                <Form className='container mt-4' onSubmit={submitRegister}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email address" onChange={e => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default Register;