import { Row, Col } from 'react-bootstrap'
import ProductCard from './ProductCard'

export default function ProductsGrid({ productos, onAgregar }) {
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-3 justify-content-center">
      {productos.map(p => (
        <Col key={p.id}>
          <ProductCard producto={p} onAgregar={onAgregar} />
        </Col>
      ))}
    </Row>
  )
}
