import React, { useEffect, useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { CartContext } from './CartContext';

const ProductList = ({ category = null }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { agregarAlCarrito } = useContext(CartContext);

    useEffect(() => {
        let url = 'https://68489b9bec44b9f349416b0e.mockapi.io/api/productos';
        if (category) {
            url = `https://fakestoreapi.com/products/category/${category}`;
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const normalizedData = data.map((item) => ({
                    ...item,
                    image: item.image || item.imagen || 'https://via.placeholder.com/200',
                    title: item.title || item.nombre || 'Producto sin título',
                    description: item.description || item.descripcion || '',
                    price: item.price || item.precio || 0,
                }));
                setProducts(normalizedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [category]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Row>
            {products.map((product) => (
                <Col md={4} key={product.id} className="mb-4">
                    <ProductCard product={product} agregarAlCarrito={agregarAlCarrito} />
                </Col>
            ))}
        </Row>
    );
};

export default ProductList;
