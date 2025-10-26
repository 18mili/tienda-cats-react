import { Row, Col } from 'react-bootstrap'
import AboutHero from '../components/AboutHero'
import TeamMemberCard from '../components/TeamMemberCard'

export default function Nosotros() {
  const equipo = [
    { nombre: 'Mila', rol: 'Fundadora',  foto: '/assets/team1.jpg' },
    { nombre: 'Luna', rol: 'Atención',   foto: '/assets/team2.jpg' },
    { nombre: 'Tom',  rol: 'Compras',    foto: '/assets/team3.jpg' },
  ]
  return (
    <>
      <AboutHero />
      <div className="container-xxl">
        <h2 className="section-title">Nuestro equipo</h2>
        <Row xs={1} sm={2} md={3} className="g-3">
          {equipo.map(m => (
            <Col key={m.nombre}>
              <TeamMemberCard {...m} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}
