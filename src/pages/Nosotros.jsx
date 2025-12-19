import { Row, Col } from 'react-bootstrap'
import AboutHero from '../components/AboutHero'
import TeamMemberCard from '../components/TeamMemberCard'

export default function Nosotros() {
  // Equipo: reemplazado por los dos miembros solicitados
  // Asunción: roles razonables asignados (puedes cambiarlos si prefieres otros)
  const equipo = [
    { nombre: 'Milagros Honorios', rol: 'Fundadora y Product Owner', foto: '/assets/team1.jpg' },
    { nombre: 'Ever Valenzuela', rol: 'Coordinador y Product Manager', foto: '/assets/team2.jpg' },
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
