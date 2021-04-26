import axios from "axios";
import Button from 'react-bootstrap/button';
import { useHistory } from "react-router";
import { useState } from "react";
import { Container, Form, Row } from "react-bootstrap";

function AddBook() {
    const history = useHistory()
    const [bookTitle, setBookTitle] = useState(null)
    const [bookUrl, setBookUrl] = useState(null)
    const [isbn, setIsbn] = useState(null)
    const [author, setAuthor] = useState(null)

    const submitBook = (e) => {
        e.preventDefault()
        axios.post('/books/new', {
            bookTitle: bookTitle,
            bookUrl: bookUrl,
            isbn: isbn,
            author: author
        }).then(() => history.push('/'))
    }

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <h1>New Book</h1>
            </Row>
            <Row className='col-6 offset-3 justify-content-md-center'>
                <Form className='container mt-4' onSubmit={submitBook}>
                    <Form.Group controlId="formBookTitle">
                        <Form.Label>Book Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter book title"
                            onChange={e => { setBookTitle(e.target.value) }}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Author name"
                            onChange={e => { setAuthor(e.target.value) }}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBookISBN">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control type="text" placeholder="ISBN" onChange={e => { setIsbn(e.target.value) }} />
                    </Form.Group>
                    <Form.Group controlId="formBookUrl">
                        <Form.Label>Book URL</Form.Label>
                        <Form.Control type="text" placeholder="URL" onChange={e => { setBookUrl(e.target.value) }} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default AddBook;