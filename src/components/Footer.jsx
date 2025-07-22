import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
    const footerStyle = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: '#6f42c1', // mismo color que el header
    };

    return (
        <footer className="text-white text-center py-4" style={footerStyle}>
            <Container>
                <Row>
                    <Col md={6}>
                        <p className="mb-0">AR Company</p>
                        <p className="mb-0">Montalban 3, Calle7</p>
                    </Col>
                    <Col md={6}>
                        <div>
                            <a href="#" className="text-white me-3">
                                <i className="fa fa-facebook fa-2x"></i>
                            </a>
                            <a href="#" className="text-white me-3">
                                <i className="fa fa-whatsapp fa-2x"></i>
                            </a>
                            <a href="#" className="text-white">
                                <i className="fa fa-instagram fa-2x"></i>
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
