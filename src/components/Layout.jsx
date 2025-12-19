import { Container } from 'react-bootstrap'
import NavbarTiendacats from './NavbarTiendacats'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    // Usamos un contenedor flex columna que ocupa toda la altura
    // para poder empujar el footer al final con `mt-auto` o `flex-grow-1`.
    <div className="d-flex flex-column min-vh-100">
      <NavbarTiendacats />

      {/* contenedor ancho “xxl” para todo el contenido; creamos un main que crece */}
      <main className="flex-grow-1 py-4">
        <Container fluid>
          <div className="container-xxl">
            {children}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
