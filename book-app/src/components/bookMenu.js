import axios from "axios"
import Card from 'react-bootstrap/card';
import Button from 'react-bootstrap/button';
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function BookMenu() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("/books").then(res => {setBooks(res.data)}).catch(err => console.log(err.response.data['message']))
    }, [])

    return (
        <div>
            <Link to='/books/new'>
                <Button variant="success" className="mb-2">Add New Book</Button>
            </Link>
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
        </div>
    )
}

export default BookMenu;