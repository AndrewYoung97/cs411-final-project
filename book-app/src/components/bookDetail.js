import axios from "axios"
import Card from 'react-bootstrap/card';
import Button from 'react-bootstrap/button';
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function BookDetail() {
    const history = useHistory()
    const { id } = useParams()
    const [book, setBook] = useState([])

    useEffect(() => {
        console.log(id)
        axios.get(`/books/${id}`).then(res => setBook(res.data))
    }, [])

    const handleDelete = () => {
        axios.delete(`/books/${id}`).then(() => { history.push('/books') })
    }

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
                        <Link to={{ pathname: `/books/${id}/edit`, book: book }}>
                            <Button className="mr-2" variant="primary">Edit</Button>
                        </Link>
                        <Button variant="warning" onClick={handleDelete}>Delete</Button>
                    </Card.Body>
                </div>
            </Row>
        </Card>
    )
}

export default BookDetail;