import { Form, Row, Col } from 'react-bootstrap'

export default function Filters({ q, setQ, categoria, setCategoria }) {
  return (
    <Form className="mb-3">
      <Row className="g-2">
        <Col md="6">
          <Form.Control
            placeholder="Buscar…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </Col>
        <Col md>
          <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Todas las categorías</option>
            <option value="alimento">Alimento</option>
            <option value="juguete">Juguete</option>
            <option value="accesorio">Accesorio</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  )
}
