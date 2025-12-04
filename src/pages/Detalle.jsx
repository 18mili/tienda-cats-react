import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductoById } from '../services/api'
import { Button, Row, Col, Alert } from 'react-bootstrap'
import { useCart } from '../context/CartContext.jsx'

export default function Detalle() {
  const { id } = useParams()
  const [p, setP] = useState(null)
  const [loading, setLoading] = useState(true)
  const { add } = useCart()

  useEffect(() => {
    setLoading(true)
    getProductoById(id).then((data) => {
      setP(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <p>Cargando…</p>

  if (!p) {
    return (
      <Alert variant="warning">
        Producto no encontrado. <Alert.Link as={Link} to="/catalogo">Volver al catálogo</Alert.Link>
      </Alert>
    )
  }

  return (
    <Row className="g-4">
      <Col md={6}>
        <img
          className="img-fluid rounded"
          src={p.imagen}
          alt={p.nombre}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </Col>
      <Col md={6}>
        <h2 className="mb-2">{p.nombre}</h2>
        <p className="lead mb-3">${p.precio.toLocaleString()}</p>
        <p className="mb-4">{p.descripcion}</p>

        <div className="d-flex gap-2">
          <Button variant="primary" onClick={() => add(p)}>Agregar al carrito</Button>
          <Button as={Link} to="/catalogo" variant="outline-secondary">Volver al catálogo</Button>
        </div>
      </Col>
    </Row>
  )
}
