import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { getPosts } from '../services/api'

export default function PostDetalle() {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    getPosts().then(posts => {
      const found = posts.find(p => p.id === Number(id))
      setPost(found)
    })
  }, [id])

  if (!post) return null

  return (
    <Container className="container-xxl py-4">
      <div className="mb-4">
        <Link to="/blog">
          <Button variant="link" className="px-0">&larr; Volver al blog</Button>
        </Link>
      </div>

      <article>
        <h1 className="h2 mb-3">{post.titulo}</h1>
        <small className="text-muted d-block mb-4">
          {new Date(post.fecha).toLocaleDateString()}
        </small>

        {post.imagen && (
          <img
            src={post.imagen}
            alt={post.titulo}
            className="img-fluid rounded mb-4"
            style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
            onError={e => e.currentTarget.style.display='none'}
          />
        )}

        <div className="article-content" style={{ whiteSpace: 'pre-wrap' }}>
          {post.contenido}
        </div>
      </article>
    </Container>
  )
}