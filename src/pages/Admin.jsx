import { useEffect, useState } from 'react'
import { Container, Card, Form, Button, Table, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getProductos } from '../services/api'
import { db } from '../firebase'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext.jsx'

export default function Admin() {
  const [productos, setProductos] = useState([])
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState({ id: '', nombre: '', precio: '', imagen: '', categoria: '', destacado: false })
  const navigate = useNavigate()
  const { user, isAdmin } = useAuth()

  // Funciones para eliminar items
  const deleteProduct = (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return
    // intentar eliminar doc en Firestore (si existe) en ambas colecciones
    ;(async () => {
      try {
        await deleteDoc(doc(db, 'productos_demo', String(id)))
      } catch (e) {
        // ignore
      }
      try {
        await deleteDoc(doc(db, 'productos', String(id)))
      } catch (e) {
        // ignore
      }
      // normalizar comparación para evitar mismatches number/string
      setProductos(prev => prev.filter(p => String(p.id) !== String(id)))
    })()
  }

  const deleteUser = (email) => {
    if (!window.confirm('¿Eliminar este usuario?')) return
    // eliminar usuario por email buscando su doc en users collection
    ;(async () => {
      try {
        const q = await getDocs(collection(db, 'users'))
        const docs = q.docs
        for (const d of docs) {
          const data = d.data()
          if (data.email === email) {
            const userId = d.id
            // eliminar documento de usuario
            try {
              await deleteDoc(doc(db, 'users', userId))
            } catch (e) {
              console.error('Error deleting user doc:', e)
            }
            // eliminar carrito asociado
            try {
              await deleteDoc(doc(db, 'carritos', userId))
            } catch (e) {
              console.error('Error deleting user cart:', e)
            }
            break
          }
        }
        setUsers(prev => prev.filter(u => u.email !== email))
        alert('Usuario eliminado correctamente.')
      } catch (e) {
        console.error('Error deleting user:', e)
        alert('Error al eliminar usuario: ' + (e.message || ''))
      }
    })()
  }

  const toggleAdmin = async (userId, currentStatus) => {
    if (!userId) return
    // Evitar que un admin se revoque a sí mismo
    if (String(userId) === String(user?.uid) && currentStatus === true) {
      alert('No puedes revocar tus propios permisos de administrador.')
      return
    }
    const action = currentStatus ? 'revocar permisos de admin' : 'promover a admin'
    if (!window.confirm(`¿Deseas ${action} para este usuario?`)) return
    try {
      await updateDoc(doc(db, 'users', String(userId)), { isAdmin: !currentStatus })
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, isAdmin: !currentStatus } : u))
    } catch (e) {
      console.error('Error updating isAdmin', e)
      alert('Error al actualizar rol: ' + (e.message || ''))
    }
  }

  const deleteOrder = (id) => {
    if (!window.confirm('¿Eliminar esta compra?')) return
    ;(async () => {
      try {
        await deleteDoc(doc(db, 'orders', String(id)))
      } catch (e) {}
      setOrders(prev => prev.filter(o => String(o.id) !== String(id)))
    })()
  }

  useEffect(() => {
    // proteger ruta: solo admin
    if (!user || !isAdmin) {
      navigate('/')
      return
    }

    // cargar recursos
    getProductos().then(setProductos)

    // cargar usuarios desde Firestore
    ;(async () => {
      try {
        const uSnap = await getDocs(collection(db, 'users'))
        setUsers(uSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      } catch (e) {
        setUsers([])
      }
    })()

    // cargar órdenes desde Firestore
    ;(async () => {
      try {
        const oSnap = await getDocs(collection(db, 'orders'))
        setOrders(oSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      } catch (e) {
        setOrders([])
      }
    })()

    return () => {}
  }, [user, isAdmin, navigate])

  const onChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const addProduct = (e) => {
    e.preventDefault()
    // crear id si no hay
    const prod = { ...form }
    prod.precio = Number(prod.precio) || 0
    ;(async () => {
      try {
        if (prod.hasOwnProperty('id')) delete prod.id
        const ref = await addDoc(collection(db, 'productos_demo'), prod)
        try { await updateDoc(doc(db, 'productos_demo', ref.id), { id: ref.id }) } catch (e) {}
        const newProd = { id: ref.id, ...prod }
        setProductos(prev => [newProd, ...prev])
      } catch (e) {
        const fallback = { id: Date.now(), ...prod }
        setProductos(prev => [fallback, ...prev])
      }
      setForm({ id: '', nombre: '', precio: '', imagen: '', categoria: '', destacado: false })
    })()
  }

  


  return (
    <Container className="container-xxl">
        <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="m-0">Panel de administración</h2>
            </div>

      <Row className="g-4">
        <Col md={4} lg={3}>
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

        <Col md={5} lg={5}>
          <Card className="p-3">
            <h5>Usuarios registrados</h5>
            {users.length === 0 ? (
              <div>No hay usuarios registrados.</div>
            ) : (
              <div className="table-responsive">
              <Table size="sm" bordered>
                <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u, i) => (
                        <tr key={u.id || i}>
                          <td>{u.nombre}</td>
                          <td>{u.email}</td>
                          <td>{u.isAdmin ? <strong>Admin</strong> : 'Usuario'}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button variant={u.isAdmin ? 'outline-warning' : 'outline-success'} size="sm" onClick={() => toggleAdmin(u.id, !!u.isAdmin)}>
                                {u.isAdmin ? 'Revocar admin' : 'Promover admin'}
                              </Button>
                              <Button variant="danger" size="sm" onClick={() => deleteUser(u.email)}>
                                Eliminar
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
              </Table>
              </div>
            )}
          </Card>
        </Col>

        <Col md={3} lg={4}>
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
