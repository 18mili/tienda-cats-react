import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
  return (
    <Card className="h-100 border-0 shadow-sm card-hover">
      <Card.Img variant="top" src={post.imagen} alt={post.titulo}
        onError={e => e.currentTarget.style.display='none'} />
      <Card.Body className="d-flex flex-column">
        <h6 className="mb-1">{post.titulo}</h6>
        <small className="text-muted mb-2">{new Date(post.fecha).toLocaleDateString()}</small>
        <p className="flex-grow-1">{post.resumen}</p>
        <div className="d-flex gap-2 mt-2 botones-ocultos">
          <Link to={`/blog/${post.id}`}>
            <Button variant="outline-secondary" size="sm">Leer más</Button>
          </Link>
          <Button variant="primary" size="sm">Compartir</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
