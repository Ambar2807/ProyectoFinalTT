import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './CartContext';

const Header = () => {
    const { carrito } = useContext(CartContext);
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <Navbar style={{ backgroundColor: '#6f42c1' }} variant="dark" expand="lg" className="mb-4" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <span>AR Company</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/" className="me-3">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/ofertas" className="me-3">Ofertas</Nav.Link>
                        <Nav.Link as={Link} to="/infaltables" className="me-3">Imperdibles</Nav.Link>

                        <div className="d-flex align-items-center mt-2 mt-lg-0">
                            <Button variant="outline-light" as={Link} to="/administracion" className="me-2">Admi</Button>
                            <Link to="/carrito" className="text-white position-relative">
                                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                                {totalItems > 0 && (
                                    <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                                        {totalItems}
                                    </Badge>
                                )}
                            </Link>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
