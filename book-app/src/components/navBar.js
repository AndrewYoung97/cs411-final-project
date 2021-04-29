import React, {useState} from 'react';
import {DropdownButton, Dropdown, Form, FormControl, InputGroup, Nav, Navbar} from "react-bootstrap";
import Button from "react-bootstrap/button";


function NavBar() {
    const [object, setObject] = useState('');

    const handleObjectSelect = async (e) => {
        await setObject(e)
    }

    return (
        <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark" sticky="top">
            <Navbar.Brand href="/">Book App</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/books">Books</Nav.Link>
                    <Nav.Link href="/authors">Authors</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;