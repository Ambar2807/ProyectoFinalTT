import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Pagination, Container, Alert, Spinner } from 'react-bootstrap';

const API_URL = 'https://68489b9bec44b9f349416b0e.mockapi.io/api/productos';

const CrudProductos = () => {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', price: '', stock: '', image: '', category: '' });
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 5;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProductos = async () => {
        setLoading(true);
        setError(null);
        try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Error al obtener productos');
        const data = await res.json();
        setProductos(data);
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        getProductos();
    }, []);

    const handleCloseForm = () => {
        setShowForm(false);
        setForm({ title: '', description: '', price: '', stock: '', image: '', category: '' });
        setEditId(null);
    };

    const handleShowForm = (producto) => {
        setShowForm(true);
        if (producto) {
        setForm({
            ...producto,
            price: Number(producto.price),
            stock: Number(producto.stock)
        });
        setEditId(producto.id);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title.trim()) {
        alert("El título es obligatorio.");
        return;
        }
        if (form.price <= 0) {
        alert("El precio debe ser mayor a 0.");
        return;
        }
        if (form.description.trim().length < 10) {
        alert("La descripción debe tener al menos 10 caracteres.");
        return;
        }

        const productData = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
        };

        const method = editId ? 'PUT' : 'POST';
        const url = editId ? `${API_URL}/${editId}` : API_URL;

        try {
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        handleCloseForm();
        getProductos();
        } catch (err) {
        alert("Error al guardar el producto.");
        }
    };

    const confirmarEliminacion = (producto) => {
        setProductoAEliminar(producto);
        setShowConfirm(true);
    };

    const eliminarProductoConfirmado = async () => {
        try {
        await fetch(`${API_URL}/${productoAEliminar.id}`, { method: 'DELETE' });
        getProductos();
        } catch (error) {
        alert("Error al eliminar el producto.");
        } finally {
        setShowConfirm(false);
        setProductoAEliminar(null);
        }
    };

    const productosFiltrados = productos.filter((prod) =>
        prod.title.toLowerCase().includes(busqueda.toLowerCase()) ||
        prod.category?.toLowerCase().includes(busqueda.toLowerCase())
    );

    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const indexUltimo = paginaActual * productosPorPagina;
    const indexPrimero = indexUltimo - productosPorPagina;
    const productosPaginados = productosFiltrados.slice(indexPrimero, indexUltimo);

    return (
        <Container className="mt-4">
        <h2>CRUD de Productos</h2>

        <Form.Control
            type="text"
            placeholder="Buscar por nombre o categoría"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="mb-3"
        />

        <Button className="mb-3" onClick={() => handleShowForm()}>Agregar Producto</Button>

        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">Error: {error}</Alert>}

        {!loading && !error && (
            <>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Categoría</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {productosPaginados.map(prod => (
                    <tr key={prod.id}>
                    <td>{prod.title}</td>
                    <td>{prod.description}</td>
                    <td>${Number(prod.price).toFixed(2)}</td>
                    <td>{prod.stock}</td>
                    <td>{prod.category}</td>
                    <td>
                        {prod.image?.startsWith('http') ? (
                        <img src={prod.image} alt={prod.title} width={50} />
                        ) : (
                        <span>{prod.image}</span>
                        )}
                    </td>
                    <td>
                        <Button size="sm" onClick={() => handleShowForm(prod)}>Editar</Button>{' '}
                        <Button size="sm" variant="danger" onClick={() => confirmarEliminacion(prod)}>Eliminar</Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Pagination className="justify-content-center">
                {[...Array(totalPaginas)].map((_, i) => (
                <Pagination.Item
                    key={i + 1}
                    active={i + 1 === paginaActual}
                    onClick={() => setPaginaActual(i + 1)}
                >
                    {i + 1}
                </Pagination.Item>
                ))}
            </Pagination>
            </>
        )}

        <Modal show={showForm} onHide={handleCloseForm}>
            <Modal.Header closeButton>
            <Modal.Title>{editId ? 'Editar' : 'Agregar'} Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                <Form.Label>Título</Form.Label>
                <Form.Control
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    required
                />
                </Form.Group>
                <Form.Group className="mb-2">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    required
                />
                </Form.Group>
                <Form.Group className="mb-2">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                    type="number"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                    required
                />
                </Form.Group>
                <Form.Group className="mb-2">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                    type="number"
                    value={form.stock}
                    onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
                    required
                />
                </Form.Group>
                <Form.Group className="mb-2">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                />
                </Form.Group>

                <Button type="submit" className="mt-2">Guardar</Button>
            </Form>
            </Modal.Body>
        </Modal>

        <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            ¿Estás seguro de que querés eliminar el producto <strong>{productoAEliminar?.title}</strong>?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancelar</Button>
            <Button variant="danger" onClick={eliminarProductoConfirmado}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
        </Container>
    );
};

export default CrudProductos;
