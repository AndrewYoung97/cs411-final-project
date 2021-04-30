import axios from "axios";
import Button from 'react-bootstrap/button';
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Container, Form, Row, Card } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";

function Main() {
    const history = useHistory()
    const [title, setTitle] = useState(null)
    const [author, setAuthor] = useState(null)
    const [books, setBooks] = useState(null)

    const submitSearch = (e) => {
        e.preventDefault()
        axios.get("/books", { params: { title: title, author: author } })
            .then(res => setBooks(res.data))
    }

    if (!books) {
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
    else {
        return (
            <Container>
                {books.map(book => {
                    return (
                        <Card className="mb-3" border="light">
                            <Row>
                                <div className="col-md-4">
                                    <Card.Img variant="top" src={book['image_url']} />
                                </div>
                                <div className="col-md-8">
                                    <Card.Header as={'h3'}>
                                        <a href={book['book_url']} style={{ color: 'black' }}>{book.title}</a>
                                    </Card.Header>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Author: {book['author_name']}</ListGroupItem>
                                        <ListGroupItem>ISBN: {book['isbn']}</ListGroupItem>
                                        <ListGroupItem>Rating Value: {book['avg_rating']}</ListGroupItem>
                                        <ListGroupItem>Review Count: {book['review_count']}</ListGroupItem>
                                    </ListGroup>
                                    <Card.Body>
                                        <Link to={{ pathname: `/books/${book['book_id']}`, book: book }}>
                                            <Button className="mr-2" variant="primary">Detail</Button>
                                        </Link>
                                    </Card.Body>
                                </div>
                            </Row>
                        </Card>
                    )
                })}
            </Container>
        )
    }
}

export default Main;