import { Card, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaFish, FaPuzzlePiece, FaTag } from 'react-icons/fa'

// --- Componente del ícono de categoría ---
function CategoriaIcon({ categoria }) {
  if (categoria === 'alimento') return <FaFish className="icon-primary" />
  if (categoria === 'juguete') return <FaPuzzlePiece className="icon-primary" />
  return <FaTag className="icon-primary" />
}

// --- Tarjeta de producto principal ---
export default function ProductCard({ producto, onAgregar }) {
  const { id, imagen, nombre, precio, categoria, destacado } = producto

  return (
    <Card className="h-100 card-hover border-0 shadow-sm">
      {/* Imagen del producto */}
      <Card.Img
        variant="top"
        src={imagen}
        alt={nombre}
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />

      <Card.Body className="d-flex flex-column">
        {/* Título y categoría */}
        <div className="d-flex justify-content-between align-items-center mb-1">
          <Card.Title className="fs-6 fw-semibold mb-0">{nombre}</Card.Title>
          <Badge bg="light" className="p-2">
            <CategoriaIcon categoria={categoria} />
          </Badge>
        </div>

        {/* Precio */}
        <Card.Text className="flex-grow-1 fw-medium mt-1 mb-3">
          ${precio.toLocaleString()}
        </Card.Text>

        {/* Botones (ocultos hasta hover) */}
        <div className="d-flex gap-2 botones-ocultos">
          <Button
            as={Link}
            to={`/producto/${id}`}
            variant="outline-secondary"
            size="sm"
          >
            Detalle
          </Button>
          <Button
            onClick={() => onAgregar?.(producto)}
            variant="primary"
            size="sm"
          >
            Agregar
          </Button>
        </div>

        {/* Etiqueta de destacado */}
        {destacado && <small className="mt-2 text-primary">★ Destacado</small>}
      </Card.Body>
    </Card>
  )
}
