import axios from "axios";
import Button from 'react-bootstrap/button';
import { useEffect, useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Main() {
    const [title, setTitle] = useState(null)
    const [author, setAuthor] = useState(null)

    const submitSearch = (e) => {
        e.preventDefault()
        axios.get("/books", { params: { title: title, author: author } })
            .then(res => console.log(res.data))
    }

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <h1>Search Book</h1>
            </Row>
            <Row className='col-6 offset-3 justify-content-md-center'>
                <Form className='container mt-4' onSubmit={submitSearch}>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Book Title" onChange={e => setTitle(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formBasicAuthor">
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Author Name" onChange={e => setAuthor(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default Main;