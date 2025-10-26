import { Card } from 'react-bootstrap'

export default function TeamMemberCard({ nombre, rol, foto }) {
  return (
    <Card className="h-100 text-center border-0 shadow-sm card-hover">
      <Card.Img variant="top" src={foto} alt={nombre}
        onError={e => e.currentTarget.style.display='none'} />
      <Card.Body>
        <h6 className="mb-1">{nombre}</h6>
        <small className="text-muted">{rol}</small>
      </Card.Body>
    </Card>
  )
}
