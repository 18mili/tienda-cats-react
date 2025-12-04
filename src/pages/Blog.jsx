import { useEffect, useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { getPosts } from '../services/api'
import PostCard from '../components/PostCard'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => { getPosts().then(setPosts) }, [])

  const filtrados = posts.filter(p =>
    p.titulo.toLowerCase().includes(q.toLowerCase()) ||
    p.resumen.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="container-xxl">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="section-title m-0">Blog</h2>
        <Form style={{ maxWidth: 280 }}>
          <Form.Control
            placeholder="Buscar..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </Form>
      </div>

      <Row xs={1} sm={2} md={3} className="g-3 justify-content-center">
        {filtrados.map(p => (
          <Col key={p.id}>
            <PostCard post={p} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
