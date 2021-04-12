import axios from "axios"
import Card from 'react-bootstrap/card';
import Button from 'react-bootstrap/button';
import {useEffect, useState} from "react";
import {ListGroup, ListGroupItem, Row} from "react-bootstrap";


function BookMenu() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function getData() {
            const response = await axios.get("/books")
            const books = response.data
            setBooks(books)
        }

        getData()
    }, [])

    return (
        <div>
            <Button variant="success" className="mb-2">Add New Book</Button>
            {books.map(book => {
                return (
                    <Card className="mb-3" border="light">
                        <Row>
                            <div className="col-md-4">
                                <Card.Img variant="top" src={book['image_url']}/>
                            </div>
                            <div className="col-md-8">
                                <Card.Header as={'h3'}>
                                    <a href={book['book_url']} style={{color: 'black'}}>{book.title}</a>
                                </Card.Header>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Author: {book['authors'].join(', ')}</ListGroupItem>
                                    <ListGroupItem>ISBN: {book['ISBN']}</ListGroupItem>
                                    <ListGroupItem>Rating Count: {book['rating_count']}</ListGroupItem>
                                    <ListGroupItem>Rating Value: {book['rating_value']}</ListGroupItem>
                                    <ListGroupItem>Review Count: {book['review_count']}</ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                    <Button className="mr-2" variant="primary">Edit</Button>
                                    <Button variant="warning">Delete</Button>
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