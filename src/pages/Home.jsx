import { Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductos } from '../services/api'
import ProductsGrid from '../components/ProductsGrid'
import { useCart } from '../context/CartContext.jsx'

export default function Home() {
  const [destacados, setDestacados] = useState([])
  const { add } = useCart()

  useEffect(() => {
    const load = () => getProductos().then(lista => setDestacados(lista.filter(p => p.destacado)))
    load()
    window.addEventListener('productos_updated', load)
    return () => window.removeEventListener('productos_updated', load)
  }, [])

  return (
    <>
      {/* Hero full width con fondo suave */}
      <section className="hero">
        <div className="container-xxl">
          <Row className="align-items-center">
            <Col lg={7} className="mb-3">
              <h1 className="display-4 fw-bold mb-2">Tienda de Gatitos</h1>
              <p className="lead mb-4">Todo lo que tu felino necesita.</p>
              <Button as={Link} to="/catalogo" variant="primary" size="lg">
                Ver catálogo
              </Button>
            </Col>
            <Col lg={5} className="text-center">
              {/* si no tienes imagen hero, se oculta al fallar */}
              <img className="img-fluid rounded" src="/assets/rascador.jpg" alt="Gato"
                   onError={e => e.currentTarget.style.display='none'} />
            </Col>
          </Row>
        </div>
      </section>

      {/* Sección de destacados */}
      <div className="container-xxl">
        <h2 className="section-title">Productos destacados</h2>
        <ProductsGrid productos={destacados} onAgregar={add} />
      </div>
    </>
  )
}
