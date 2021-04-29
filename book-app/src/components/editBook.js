import axios from "axios";
import Button from 'react-bootstrap/button';
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Form, Row } from "react-bootstrap";

function EditBook() {
    const { id } = useParams()
    const initial_book = useLocation().book
    const history = useHistory()
    const [bookTitle, setBookTitle] = useState(null)
    const [bookUrl, setBookUrl] = useState(null)
    const [isbn, setIsbn] = useState(null)
    const [author, setAuthor] = useState(null)

    useEffect(() => {
        setBookTitle(initial_book['title'])
        setBookUrl(initial_book['link'])
        setIsbn(initial_book['isbn'])
        setAuthor(initial_book['author_name'])
    }, [initial_book])

    const submitBook = (e) => {
        e.preventDefault()
        axios.put(`/books/${id}`, {
            bookId: id,
            bookTitle: bookTitle,
            bookUrl: bookUrl,
            isbn: isbn,
            author: author
        }).then(() => history.push(`/books/${id}`))
    }

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <h1>Edit Book</h1>
            </Row>
            <Row className='col-6 offset-3 justify-content-md-center'>
                <Form className='container mt-4' onSubmit={submitBook}>
                    <Form.Group controlId="formBookTitle">
                        <Form.Label>Book Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={bookTitle}
                            onChange={e => { setBookTitle(e.target.value) }}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            value={author}
                            onChange={e => { setAuthor(e.target.value) }}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBookISBN">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control type="text" value={isbn} onChange={e => { setIsbn(e.target.value) }} />
                    </Form.Group>
                    <Form.Group controlId="formBookUrl">
                        <Form.Label>Book URL</Form.Label>
                        <Form.Control type="text" value={bookUrl} onChange={e => { setBookUrl(e.target.value) }} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default EditBook;