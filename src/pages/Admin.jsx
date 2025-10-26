import { useEffect, useState } from 'react'
import { Container, Card, Form, Button, Table, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getProductos } from '../services/api'

export default function Admin() {
  const [productos, setProductos] = useState([])
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState({ id: '', nombre: '', precio: '', imagen: '', categoria: '', destacado: false })
  const navigate = useNavigate()

  // Funciones para eliminar items
  const deleteProduct = (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return
    const raw = localStorage.getItem('productos_demo')
    if (raw) {
      const arr = JSON.parse(raw).filter(p => p.id !== id)
      localStorage.setItem('productos_demo', JSON.stringify(arr))
      setProductos(prev => prev.filter(p => p.id !== id))
      window.dispatchEvent(new Event('productos_updated'))
    }
  }

  const deleteUser = (email) => {
    if (!window.confirm('¿Eliminar este usuario?')) return
    const arr = users.filter(u => u.email !== email)
    localStorage.setItem('users_demo', JSON.stringify(arr))
    setUsers(arr)
  }

  const deleteOrder = (id) => {
    if (!window.confirm('¿Eliminar esta compra?')) return
    const arr = orders.filter(o => o.id !== id)
    localStorage.setItem('orders_demo', JSON.stringify(arr))
    setOrders(arr)
  }

  useEffect(() => {
    // proteger ruta: solo admin
    const auth = JSON.parse(localStorage.getItem('auth_demo') || 'null')
    if (!auth || !auth.isAdmin) navigate('/')

    // cargar recursos demo
    getProductos().then(setProductos)
    setUsers(JSON.parse(localStorage.getItem('users_demo') || '[]'))
    setOrders(JSON.parse(localStorage.getItem('orders_demo') || '[]'))

    // escuchar nuevas órdenes que se creen desde Carrito
    const onOrders = () => setOrders(JSON.parse(localStorage.getItem('orders_demo') || '[]'))
    window.addEventListener('orders_updated', onOrders)
    return () => window.removeEventListener('orders_updated', onOrders)
  }, [])

  const onChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const addProduct = (e) => {
    e.preventDefault()
    // crear id si no hay
    const prod = { ...form }
    if (!prod.id) prod.id = Date.now()
    prod.precio = Number(prod.precio) || 0

    const raw = localStorage.getItem('productos_demo')
    const arr = raw ? JSON.parse(raw) : []
    arr.unshift(prod)
    localStorage.setItem('productos_demo', JSON.stringify(arr))
    setProductos(prev => [prod, ...prev])
    // notificar a la app para que otras vistas (Home/Catalogo) puedan refrescar
    try { window.dispatchEvent(new Event('productos_updated')) } catch (e) {}
    setForm({ id: '', nombre: '', precio: '', imagen: '', categoria: '', destacado: false })
  }

  return (
    <Container className="container-xxl">
      <h2 className="mb-4">Panel de administración</h2>

      <Row className="g-4">
        <Col md={6} lg={4}>
          <Card className="p-3">
            <h5>Agregar producto</h5>
            <Form onSubmit={addProduct}>
              <Form.Group className="mb-2">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" value={form.nombre} onChange={onChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Precio</Form.Label>
                <Form.Control name="precio" value={form.precio} onChange={onChange} type="number" />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Imagen (url)</Form.Label>
                <Form.Control name="imagen" value={form.imagen} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Categoria</Form.Label>
                <Form.Select name="categoria" value={form.categoria} onChange={onChange}>
                  <option value="">Seleccione...</option>
                  <option value="alimento">Alimento</option>
                  <option value="juguete">Juguete</option>
                  <option value="accesorio">Accesorio</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 form-check">
                <Form.Check type="checkbox" label="Destacado" name="destacado" checked={form.destacado} onChange={onChange} />
              </Form.Group>
              <Button type="submit" variant="primary">Agregar producto</Button>
            </Form>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="p-3">
            <h5>Usuarios registrados</h5>
            {users.length === 0 ? (
              <div>No hay usuarios registrados.</div>
            ) : (
              <Table size="sm" bordered>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={i}>
                      <td>{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => deleteUser(u.email)}>
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>
        </Col>

        <Col md={12} lg={4}>
          <Card className="p-3">
            <h5>Compras / Pedidos</h5>
            {orders.length === 0 ? (
              <div>No hay compras registradas.</div>
            ) : (
              <div className="table-responsive">
                <Table size="sm" bordered className="mb-0">
                  <thead>
                    <tr>
                      <th style={{width: "20%"}}>ID</th>
                      <th style={{width: "30%"}}>Usuario</th>
                      <th style={{width: "15%"}}>Items</th>
                      <th style={{width: "20%"}}>Total</th>
                      <th style={{width: "15%"}}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o, i) => (
                      <tr key={i}>
                        <td className="text-truncate" style={{maxWidth: 0}}>{o.id}</td>
                        <td className="text-truncate" style={{maxWidth: 0}}>{o.buyer || 'guest'}</td>
                        <td className="text-center">{o.items ? Object.values(o.items).length : 0}</td>
                        <td className="text-end">${o.total?.toLocaleString() || '-'}</td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => deleteOrder(o.id)}>
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <hr />

      <h5 className="mt-4">Productos actuales</h5>
      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Destacado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>${p.precio?.toLocaleString()}</td>
              <td>{p.categoria}</td>
              <td>{p.destacado ? 'Sí' : 'No'}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => deleteProduct(p.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
