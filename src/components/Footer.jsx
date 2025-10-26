import { Container } from 'react-bootstrap'

export default function Footer() {
  return (
    // `mt-auto` hace que el footer se quede abajo cuando el contenido no llena la pantalla
    <footer className="bg-light py-3 mt-auto">
      <Container className="text-center">
        <small>© {new Date().getFullYear()} TiendaCats</small>
      </Container>
    </footer>
  )
}
